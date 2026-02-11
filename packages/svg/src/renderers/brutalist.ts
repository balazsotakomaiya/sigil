import type { BrutalistSpec } from 'sigil-core';

export function renderBrutalist(spec: BrutalistSpec, size: number): string {
	const { initials, palette, fontSize } = spec;
	const uid = `br${initials.toLowerCase()}${fontSize}`;

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <defs>
    <clipPath id="${uid}_c"><rect width="100" height="100" rx="4" ry="4"/></clipPath>
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
