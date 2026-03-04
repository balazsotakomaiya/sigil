import '../types.dart';

String renderTerminal(TerminalSpec spec, int size, [BorderRadius? borderRadius]) {
  final palette = spec.palette;
  final brs = borderRadius == BorderRadius.square
      ? 's'
      : borderRadius == BorderRadius.round
          ? 'r'
          : 'q';
  final uid = 'tm${spec.hashValue}$brs';
  final rx = borderRadius == BorderRadius.square
      ? 0
      : borderRadius == BorderRadius.round
          ? 50
          : 8;

  // Scanlines
  final scanlinesBuf = StringBuffer();
  for (int y = 0; y < 100; y += 4) {
    scanlinesBuf.write(
        '<rect x="0" y="$y" width="100" height="1.5" fill="${palette.fg}" opacity="0.03"/>');
  }
  final scanlines = scanlinesBuf.toString();

  // Prompt character
  String promptChar = '';
  int promptX = 0;
  if (spec.promptStyle == 0) {
    promptChar = '>';
    promptX = spec.initials.length == 1 ? 24 : 14;
  } else if (spec.promptStyle == 1) {
    promptChar = r'$';
    promptX = spec.initials.length == 1 ? 24 : 14;
  } else if (spec.promptStyle == 2) {
    promptChar = '~';
    promptX = spec.initials.length == 1 ? 22 : 12;
  }

  // Top bar decoration
  String topDecor;
  if (spec.topBar == 0) {
    topDecor = '<circle cx="14" cy="12" r="3" fill="${palette.fg}" opacity="0.2"/>\n'
        '    <circle cx="24" cy="12" r="3" fill="${palette.fg}" opacity="0.14"/>\n'
        '    <circle cx="34" cy="12" r="3" fill="${palette.fg}" opacity="0.08"/>';
  } else if (spec.topBar == 1) {
    topDecor =
        '<text x="12" y="14" fill="${palette.dim}" font-family="\'IBM Plex Mono\', monospace" font-size="7" opacity="0.6">~/usr</text>';
  } else {
    topDecor = '';
  }

  // Bottom status line
  String bottomDecor;
  if (spec.statusLine == 0) {
    bottomDecor =
        '<rect x="0" y="88" width="100" height="12" fill="${palette.fg}" opacity="0.05"/>\n'
        '    <text x="8" y="96" fill="${palette.dim}" font-family="\'IBM Plex Mono\', monospace" font-size="6" opacity="0.5">pid:${spec.hashValue % 9999}</text>\n'
        '    <text x="76" y="96" fill="${palette.dim}" font-family="\'IBM Plex Mono\', monospace" font-size="6" opacity="0.5">0:00</text>';
  } else if (spec.statusLine == 1) {
    bottomDecor =
        '<line x1="10" y1="90" x2="90" y2="90" stroke="${palette.fg}" stroke-width="0.5" opacity="0.1"/>';
  } else {
    bottomDecor = '';
  }

  final glowOpacity = palette.bg == '#F5F5F0' ? 0 : 0.08;
  final cursorX = spec.initials.length == 1 ? 62 : 68;
  final fontSize = spec.fontSize;

  final promptPrefix = promptChar.isNotEmpty ? '$promptChar ' : '';
  final ghostText =
      '<text x="50" y="52" dy="0.35em" text-anchor="middle" fill="${palette.fg}" '
      'font-family="\'IBM Plex Mono\', \'SF Mono\', monospace" font-size="$fontSize" font-weight="500" '
      'filter="url(#${uid}_blur)" opacity="0.4">$promptPrefix${spec.initials}</text>';

  String promptEl = '';
  if (promptChar.isNotEmpty) {
    promptEl = '<text x="$promptX" y="52" dy="0.35em" fill="${palette.dim}" '
        'font-family="\'IBM Plex Mono\', monospace" font-size="$fontSize" font-weight="400">$promptChar</text>';
  }

  final textX = promptChar.isNotEmpty
      ? promptX + (spec.initials.length == 1 ? 20 : 16)
      : 50;
  final textAnchor = promptChar.isNotEmpty ? '' : ' text-anchor="middle"';
  final mainText = '<text x="$textX" y="52" dy="0.35em"$textAnchor fill="${palette.fg}" '
      'font-family="\'IBM Plex Mono\', \'SF Mono\', monospace" font-size="$fontSize" font-weight="600">${spec.initials}</text>';

  String cursorEl = '';
  if (spec.showCursor) {
    final cx = promptChar.isNotEmpty
        ? promptX + (spec.initials.length == 1 ? 20 : 16) + spec.initials.length * fontSize * 0.6 + 2
        : cursorX;
    cursorEl = '<rect x="$cx" y="${52 - fontSize * 0.35}" width="${fontSize * 0.55}" '
        'height="${fontSize * 0.85}" fill="${palette.fg}" opacity="0.7"/>';
  }

  return '''<svg xmlns="http://www.w3.org/2000/svg" width="$size" height="$size" viewBox="0 0 100 100">
  <defs>
    <clipPath id="${uid}_c"><rect width="100" height="100" rx="$rx" ry="$rx"/></clipPath>
    <radialGradient id="${uid}_glow" cx="50%" cy="50%">
      <stop offset="0%" stop-color="${palette.fg}" stop-opacity="$glowOpacity"/>
      <stop offset="100%" stop-color="${palette.fg}" stop-opacity="0"/>
    </radialGradient>
    <filter id="${uid}_blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="8"/>
    </filter>
  </defs>
  <g clip-path="url(#${uid}_c)">
    <rect width="100" height="100" fill="${palette.bg}"/>
    $scanlines
    <rect width="100" height="100" fill="url(#${uid}_glow)"/>
    $ghostText
    $promptEl
    $mainText
    $cursorEl
    $topDecor
    $bottomDecor
  </g>
</svg>''';
}
