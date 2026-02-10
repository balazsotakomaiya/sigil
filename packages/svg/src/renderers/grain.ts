import type { GrainSpec } from '@sigil/core';

export function renderGrain(spec: GrainSpec, size: number): string {
	const { initials, palette, blobs, noiseFreq, noiseSeed, fontSize } = spec;
	const uid = `gr${noiseSeed}`;

	const blobSvg = blobs
		.map(
			(b) =>
				`<circle cx="${b.cx}" cy="${b.cy}" r="${b.r}" fill="${palette.accent}" opacity="${b.opacity}"/>`,
		)
		.join('\n    ');

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <defs>
    <filter id="${uid}_ng" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="${noiseFreq}" numOctaves="4" seed="${noiseSeed}" stitchTiles="stitch" result="noise"/>
      <feColorMatrix type="saturate" values="0" in="noise" result="mono"/>
      <feComponentTransfer in="mono" result="faded">
        <feFuncA type="linear" slope="0.45"/>
      </feComponentTransfer>
      <feBlend in="SourceGraphic" in2="faded" mode="overlay"/>
    </filter>
    <clipPath id="${uid}_c"><rect width="100" height="100" rx="14" ry="14"/></clipPath>
  </defs>
  <g clip-path="url(#${uid}_c)">
    <rect width="100" height="100" fill="${palette.bg}"/>
    ${blobSvg}
    <rect width="100" height="100" filter="url(#${uid}_ng)" fill="transparent"/>
    <text x="50" y="52" dy="0.35em" text-anchor="middle" fill="white" font-family="'Instrument Serif', 'Georgia', serif" font-size="${fontSize}" font-weight="400" opacity="0.95" style="letter-spacing:-1px">${initials}</text>
  </g>
</svg>`;
}
