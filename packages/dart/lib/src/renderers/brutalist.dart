import '../types.dart';

String renderBrutalist(BrutalistSpec spec, int size, [BorderRadius? borderRadius]) {
  final brs = borderRadius == BorderRadius.square
      ? 's'
      : borderRadius == BorderRadius.round
          ? 'r'
          : 'q';
  final uid = 'br${spec.initials.toLowerCase()}${spec.fontSize}$brs';
  final rx = borderRadius == BorderRadius.square
      ? 0
      : borderRadius == BorderRadius.round
          ? 50
          : 4;

  return '''<svg xmlns="http://www.w3.org/2000/svg" width="$size" height="$size" viewBox="0 0 100 100">
  <defs>
    <clipPath id="${uid}_c"><rect width="100" height="100" rx="$rx" ry="$rx"/></clipPath>
    <mask id="${uid}_m">
      <rect width="100" height="100" fill="white"/>
      <text x="50" y="52" dy="0.35em" text-anchor="middle" fill="black" font-family="\'Space Mono\', monospace" font-size="${spec.fontSize}" font-weight="700">${spec.initials}</text>
    </mask>
  </defs>
  <g clip-path="url(#${uid}_c)">
    <rect width="100" height="100" fill="${spec.bg}"/>
    <rect width="100" height="100" fill="${spec.fg}" mask="url(#${uid}_m)"/>
  </g>
</svg>''';
}
