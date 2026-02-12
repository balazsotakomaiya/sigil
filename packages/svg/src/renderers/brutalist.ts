import type { BorderRadius, BrutalistSpec } from '@sigil-ts/core';

export function renderBrutalist(
	spec: BrutalistSpec,
	size: number,
	borderRadius?: BorderRadius,
): string {
	const { initials, palette, fontSize } = spec;
	const brs = borderRadius === 'square' ? 's' : borderRadius === 'round' ? 'r' : 'q';
	const uid = `br${initials.toLowerCase()}${fontSize}${brs}`;
	const rx = borderRadius === 'square' ? 0 : borderRadius === 'round' ? 50 : 4;

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <defs>
    <clipPath id="${uid}_c"><rect width="100" height="100" rx="${rx}" ry="${rx}"/></clipPath>
    <mask id="${uid}_m">
      <rect width="100" height="100" fill="white"/>
      <text x="50" y="52" dy="0.35em" text-anchor="middle" fill="black" font-family="'Space Mono', monospace" font-size="${fontSize}" font-weight="700">${initials}</text>
    </mask>
  </defs>
  <g clip-path="url(#${uid}_c)">
    <rect width="100" height="100" fill="${palette.bg}"/>
    <rect width="100" height="100" fill="${palette.fg}" mask="url(#${uid}_m)"/>
  </g>
</svg>`;
}
