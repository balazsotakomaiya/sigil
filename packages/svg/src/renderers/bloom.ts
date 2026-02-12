import type { BloomSpec, BorderRadius } from '@sigil-ts/core';

export function renderBloom(spec: BloomSpec, size: number, borderRadius?: BorderRadius): string {
	const { initials, palette, mainOrb, sparkOrb, grainSeed, fontSize } = spec;
	const brs = borderRadius === 'square' ? 's' : borderRadius === 'round' ? 'r' : 'q';
	const uid = `bl${grainSeed}${brs}`;
	const rx = borderRadius === 'square' ? 0 : borderRadius === 'round' ? 50 : 16;

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <defs>
    <clipPath id="${uid}_c"><rect width="100" height="100" rx="${rx}"/></clipPath>
    <filter id="${uid}_b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="20"/></filter>
    <filter id="${uid}_bs" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10"/></filter>
    <filter id="${uid}_g" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" seed="${grainSeed}"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.18"/></feComponentTransfer>
      <feBlend in="SourceGraphic" mode="overlay"/>
    </filter>
  </defs>
  <g clip-path="url(#${uid}_c)">
    <rect width="100" height="100" fill="${palette.bg}"/>
    <circle cx="${mainOrb.cx}" cy="${mainOrb.cy}" r="${mainOrb.r}" fill="${palette.orbs[0]}" filter="url(#${uid}_b)" opacity="0.65"/>
    <circle cx="${sparkOrb.cx}" cy="${sparkOrb.cy}" r="12" fill="${palette.orbs[1]}" filter="url(#${uid}_bs)" opacity="0.45"/>
    <rect width="100" height="100" filter="url(#${uid}_g)" fill="transparent"/>
    <text x="50" y="52" dy="0.35em" text-anchor="middle" fill="white" font-family="'DM Sans', 'Helvetica Neue', sans-serif" font-size="${fontSize}" font-weight="400" opacity="0.92" style="letter-spacing:0.5px">${initials}</text>
  </g></svg>`;
}
