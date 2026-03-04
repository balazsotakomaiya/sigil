import '../types.dart';

String renderGhosts(GhostsSpec spec, int size, [BorderRadius? borderRadius]) {
  final palette = spec.palette;
  final brs = borderRadius == BorderRadius.square
      ? 's'
      : borderRadius == BorderRadius.round
          ? 'r'
          : 'q';
  final uid = 'gh${spec.bodyW}${spec.eyeType}$brs';
  final rx = borderRadius == BorderRadius.square
      ? 0
      : borderRadius == BorderRadius.round
          ? 50
          : 16;

  // Build wavy bottom path
  final segW = (spec.bodyW * 2) / spec.numWaves;
  final bottomBuf = StringBuffer();
  for (int i = 0; i < spec.numWaves; i++) {
    final sx = 50 - spec.bodyW + i * segW;
    final ex = sx + segW;
    final dir = i % 2 == 0 ? 1 : -1;
    bottomBuf.write('Q${(sx + ex) / 2},${spec.bodyBottom + spec.waveAmp * dir} $ex,${spec.bodyBottom} ');
  }

  final ghostPath =
      'M${50 - spec.bodyW},${spec.bodyTop + spec.bodyW} L${50 - spec.bodyW},${spec.bodyBottom} '
      '${bottomBuf.toString()}'
      'L${50 + spec.bodyW},${spec.bodyTop + spec.bodyW} '
      'C${50 + spec.bodyW},${spec.bodyTop - spec.bodyW * 0.5} ${50 - spec.bodyW},${spec.bodyTop - spec.bodyW * 0.5} ${50 - spec.bodyW},${spec.bodyTop + spec.bodyW} Z';

  final eSpacing = spec.eyeSpacing;
  final eY = spec.eyeY;

  // Eyes
  String eyes;
  if (spec.eyeType == 0) {
    eyes = '<circle cx="${50 - eSpacing}" cy="$eY" r="3.5" fill="${palette.bg}"/>'
        '<circle cx="${50 + eSpacing}" cy="$eY" r="3.5" fill="${palette.bg}"/>';
  } else if (spec.eyeType == 1) {
    eyes = '<ellipse cx="${50 - eSpacing}" cy="$eY" rx="3" ry="4" fill="${palette.bg}"/>'
        '<ellipse cx="${50 + eSpacing}" cy="$eY" rx="3" ry="4" fill="${palette.bg}"/>';
  } else if (spec.eyeType == 2) {
    eyes = '<path d="M${50 - eSpacing - 3},${eY + 1} Q${50 - eSpacing},${eY - 3} ${50 - eSpacing + 3},${eY + 1}" fill="none" stroke="${palette.bg}" stroke-width="2.2" stroke-linecap="round"/>'
        '<path d="M${50 + eSpacing - 3},${eY + 1} Q${50 + eSpacing},${eY - 3} ${50 + eSpacing + 3},${eY + 1}" fill="none" stroke="${palette.bg}" stroke-width="2.2" stroke-linecap="round"/>';
  } else if (spec.eyeType == 3) {
    eyes = '<circle cx="${50 - eSpacing}" cy="$eY" r="4" fill="${palette.bg}"/>'
        '<circle cx="${50 - eSpacing + 1}" cy="${eY - 1}" r="1.5" fill="${palette.color}"/>'
        '<circle cx="${50 + eSpacing}" cy="$eY" r="4" fill="${palette.bg}"/>'
        '<circle cx="${50 + eSpacing + 1}" cy="${eY - 1}" r="1.5" fill="${palette.color}"/>';
  } else {
    eyes = '<line x1="${50 - eSpacing - 3}" y1="$eY" x2="${50 - eSpacing + 3}" y2="$eY" stroke="${palette.bg}" stroke-width="2.5" stroke-linecap="round"/>'
        '<line x1="${50 + eSpacing - 3}" y1="$eY" x2="${50 + eSpacing + 3}" y2="$eY" stroke="${palette.bg}" stroke-width="2.5" stroke-linecap="round"/>';
  }

  // Mouth
  final mY = spec.mouthY;
  String mouth;
  if (spec.mouthType == 0) {
    mouth = '<ellipse cx="50" cy="$mY" rx="3.5" ry="3" fill="${palette.bg}"/>';
  } else if (spec.mouthType == 1) {
    mouth = '<path d="M47,${mY - 1} Q50,${mY + 4} 53,${mY - 1}" fill="none" stroke="${palette.bg}" stroke-width="1.8" stroke-linecap="round"/>';
  } else if (spec.mouthType == 2) {
    mouth = '<line x1="47" y1="$mY" x2="53" y2="$mY" stroke="${palette.bg}" stroke-width="1.8" stroke-linecap="round"/>';
  } else {
    mouth = '<path d="M46,${mY - 1} Q48,${mY + 3} 50,${mY - 1} Q52,${mY + 3} 54,${mY - 1}" fill="none" stroke="${palette.bg}" stroke-width="1.5" stroke-linecap="round"/>';
  }

  // Blush
  final blush = spec.hasBlush
      ? '<circle cx="${50 - eSpacing - 2}" cy="${eY + 5}" r="4" fill="${palette.cheek}" opacity="0.25"/>'
          '<circle cx="${50 + eSpacing + 2}" cy="${eY + 5}" r="4" fill="${palette.cheek}" opacity="0.25"/>'
      : '';

  // Sparkles
  final sparkleSvg = spec.sparkles
      .map((s) => '<circle cx="${s.cx}" cy="${s.cy}" r="${s.r}" fill="${palette.color}" opacity="0.2"/>')
      .join('');

  return '''<svg xmlns="http://www.w3.org/2000/svg" width="$size" height="$size" viewBox="0 0 100 100">
  <defs><clipPath id="${uid}_c"><rect width="100" height="100" rx="$rx"/></clipPath></defs>
  <g clip-path="url(#${uid}_c)">
    <rect width="100" height="100" fill="${palette.bg}"/>
    $sparkleSvg
    <g transform="translate(0,${spec.floatY}) rotate(${spec.tilt}, 50, 50)">
      <path d="$ghostPath" fill="${palette.color}" opacity="0.85"/>
      $eyes
      $mouth
      $blush
    </g>
  </g></svg>''';
}
