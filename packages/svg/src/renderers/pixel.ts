import type { PixelSpec } from '@sigil/core';

export function renderPixel(spec: PixelSpec, size: number): string {
	const { palette, bgPixels, letterBitmaps } = spec;
	const uid = `px${letterBitmaps[0].startX}${bgPixels.length}`;

	let bgPixelsSvg = '';
	for (const p of bgPixels) {
		const fill = p.useHi ? palette.hi : palette.fg;
		bgPixelsSvg += `<rect x="${p.x}" y="${p.y}" width="${p.size}" height="${p.size}" fill="${fill}" opacity="${p.opacity}"/>`;
	}

	let letterPixelsSvg = '';
	for (const letter of letterBitmaps) {
		const { bitmap, startX, startY, cellSize } = letter;
		for (let row = 0; row < 5; row++) {
			for (let col = 0; col < 5; col++) {
				if (bitmap[row * 5 + col]) {
					const rx = cellSize >= 10 ? 0.5 : 0.3;
					letterPixelsSvg += `<rect x="${startX + col * cellSize}" y="${startY + row * cellSize}" width="${cellSize}" height="${cellSize}" fill="${palette.fg}" rx="${rx}"/>`;
				}
			}
		}
	}

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100" shape-rendering="crispEdges">
  <defs>
    <clipPath id="${uid}_c"><rect width="100" height="100" rx="6" ry="6"/></clipPath>
  </defs>
  <g clip-path="url(#${uid}_c)">
    <rect width="100" height="100" fill="${palette.bg}"/>
    ${bgPixelsSvg}
    ${letterPixelsSvg}
  </g>
</svg>`;
}
