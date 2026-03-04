import '../types.dart';

String renderFaces(FacesSpec spec, int size, [BorderRadius? borderRadius]) {
  final bg = spec.palette.bg;
  final col = spec.palette.color;
  final accent = spec.palette.accent;

  final brs = borderRadius == BorderRadius.square
      ? 's'
      : borderRadius == BorderRadius.round
          ? 'r'
          : 'q';
  final uid = 'fc${spec.initials}${spec.eyeSpacing}$brs';
  final rx = borderRadius == BorderRadius.square
      ? 0
      : borderRadius == BorderRadius.round
          ? 50
          : 16;

  final eSpacing = spec.eyeSpacing;
  final eY = spec.eyeY;
  final eSize = spec.eyeSize;

  String eyes;
  if (spec.eyeShape == 0) {
    eyes = '<circle cx="${50 - eSpacing}" cy="$eY" r="$eSize" fill="$col"/>\n'
        '    <circle cx="${50 + eSpacing}" cy="$eY" r="$eSize" fill="$col"/>';
  } else if (spec.eyeShape == 1) {
    eyes = '<ellipse cx="${50 - eSpacing}" cy="$eY" rx="${eSize * 0.7}" ry="${eSize * 1.2}" fill="$col"/>\n'
        '    <ellipse cx="${50 + eSpacing}" cy="$eY" rx="${eSize * 0.7}" ry="${eSize * 1.2}" fill="$col"/>';
  } else {
    eyes = '<line x1="${50 - eSpacing - 4}" y1="$eY" x2="${50 - eSpacing + 4}" y2="$eY" stroke="$col" stroke-width="2.5" stroke-linecap="round"/>\n'
        '    <line x1="${50 + eSpacing - 4}" y1="$eY" x2="${50 + eSpacing + 4}" y2="$eY" stroke="$col" stroke-width="2.5" stroke-linecap="round"/>';
  }

  final brows = spec.hasBrows
      ? '<line x1="${50 - eSpacing - 4}" y1="${eY - 8 + spec.browOffset}" x2="${50 - eSpacing + 3}" y2="${eY - 9}" stroke="$col" stroke-width="1.8" stroke-linecap="round"/>\n'
          '    <line x1="${50 + eSpacing - 3}" y1="${eY - 9}" x2="${50 + eSpacing + 4}" y2="${eY - 8 + spec.browOffset}" stroke="$col" stroke-width="1.8" stroke-linecap="round"/>'
      : '';

  final mY = spec.mouthY;
  String mouth;
  if (spec.mouthStyle == 0) {
    mouth = '<path d="M44 $mY Q50 ${mY + 7} 56 $mY" fill="none" stroke="$col" stroke-width="2" stroke-linecap="round"/>';
  } else if (spec.mouthStyle == 1) {
    mouth = '<ellipse cx="50" cy="${mY + 1}" rx="5" ry="4.5" fill="$col"/>';
  } else if (spec.mouthStyle == 2) {
    mouth = '<line x1="44" y1="$mY" x2="56" y2="$mY" stroke="$col" stroke-width="2" stroke-linecap="round"/>';
  } else {
    mouth = '<path d="M44 $mY Q47 ${mY + 4} 50 $mY" fill="none" stroke="$col" stroke-width="1.8" stroke-linecap="round"/>\n'
        '    <path d="M50 $mY Q53 ${mY + 4} 56 $mY" fill="none" stroke="$col" stroke-width="1.8" stroke-linecap="round"/>';
  }

  String nose;
  if (spec.noseStyle == 0) {
    nose = '<circle cx="50" cy="${eY + 10}" r="1.5" fill="$col" opacity="0.5"/>';
  } else if (spec.noseStyle == 1) {
    nose = '<line x1="50" y1="${eY + 6}" x2="50" y2="${eY + 11}" stroke="$col" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>';
  } else {
    nose = '';
  }

  final blush = spec.hasBlush
      ? '<circle cx="${50 - eSpacing - 2}" cy="${eY + 8}" r="5" fill="$accent" opacity="0.2"/>\n'
          '  <circle cx="${50 + eSpacing + 2}" cy="${eY + 8}" r="5" fill="$accent" opacity="0.2"/>'
      : '';

  final freckles = spec.hasFreckles
      ? '<circle cx="38" cy="50" r="1" fill="$col" opacity="0.2"/>\n'
          '  <circle cx="41" cy="52" r="1" fill="$col" opacity="0.15"/>\n'
          '  <circle cx="59" cy="49" r="1" fill="$col" opacity="0.2"/>\n'
          '  <circle cx="62" cy="51" r="1" fill="$col" opacity="0.15"/>'
      : '';

  return '''<svg xmlns="http://www.w3.org/2000/svg" width="$size" height="$size" viewBox="0 0 100 100">
  <defs>
    <clipPath id="${uid}_c"><rect width="100" height="100" rx="$rx" ry="$rx"/></clipPath>
  </defs>
  <g clip-path="url(#${uid}_c)">
    <rect width="100" height="100" fill="$bg"/>
    <g transform="rotate(${spec.headTilt}, 50, 50)">
      <ellipse cx="50" cy="47" rx="28" ry="30" fill="none" stroke="$col" stroke-width="2.2"/>
      $eyes
      $brows
      $nose
      $mouth
      $blush
      $freckles
    </g>
    <text x="50" y="82" text-anchor="middle" fill="$col" font-family="\'Caveat\', cursive" font-size="14" font-weight="600" opacity="0.7">${spec.initials}</text>
  </g>
</svg>''';
}
