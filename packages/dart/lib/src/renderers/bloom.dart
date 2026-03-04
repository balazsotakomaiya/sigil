import '../types.dart';

String renderBloom(BloomSpec spec, int size, [BorderRadius? borderRadius]) {
  final palette = spec.palette;
  final brs = borderRadius == BorderRadius.square
      ? 's'
      : borderRadius == BorderRadius.round
          ? 'r'
          : 'q';
  final uid = 'bl${spec.grainSeed}$brs';
  final rx = borderRadius == BorderRadius.square
      ? 0
      : borderRadius == BorderRadius.round
          ? 50
          : 16;

  return '''<svg xmlns="http://www.w3.org/2000/svg" width="$size" height="$size" viewBox="0 0 100 100">
  <defs>
    <clipPath id="${uid}_c"><rect width="100" height="100" rx="$rx"/></clipPath>
    <filter id="${uid}_b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="20"/></filter>
    <filter id="${uid}_bs" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10"/></filter>
    <filter id="${uid}_g" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" seed="${spec.grainSeed}"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.18"/></feComponentTransfer>
      <feBlend in="SourceGraphic" mode="overlay"/>
    </filter>
  </defs>
  <g clip-path="url(#${uid}_c)">
    <rect width="100" height="100" fill="${palette.bg}"/>
    <circle cx="${spec.mainOrb.cx}" cy="${spec.mainOrb.cy}" r="${spec.mainOrb.r}" fill="${palette.orb0}" filter="url(#${uid}_b)" opacity="0.65"/>
    <circle cx="${spec.sparkOrb.cx}" cy="${spec.sparkOrb.cy}" r="12" fill="${palette.orb1}" filter="url(#${uid}_bs)" opacity="0.45"/>
    <rect width="100" height="100" filter="url(#${uid}_g)" fill="transparent"/>
    <text x="50" y="52" dy="0.35em" text-anchor="middle" fill="white" font-family="\'DM Sans\', \'Helvetica Neue\', sans-serif" font-size="${spec.fontSize}" font-weight="400" opacity="0.92" style="letter-spacing:0.5px">${spec.initials}</text>
  </g></svg>''';
}
