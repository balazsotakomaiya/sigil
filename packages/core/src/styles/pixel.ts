import { fnv1a, seeded } from '../hash';
import { extractInitials } from '../initials';
import { PIXEL_PALETTES } from '../palettes';
import { PIXEL_FONT } from '../pixel-font';
import type { PixelSpec } from '../types';

export function pixelStyle(name: string): PixelSpec {
	const initials = extractInitials(name);
	const h = fnv1a(name.trim().toLowerCase());
	const palette = PIXEL_PALETTES[h % PIXEL_PALETTES.length];

	const pxSize = 10;
	const bgPixels: PixelSpec['bgPixels'] = [];
	for (let i = 0; i < 12; i++) {
		bgPixels.push({
			x: (seeded(h, i + 50) % 10) * pxSize,
			y: (seeded(h, i + 70) % 10) * pxSize,
			size: pxSize,
			useHi: seeded(h, i + 90) % 3 === 0,
			opacity: 0.08 + (seeded(h, i + 110) % 10) / 100,
		});
	}

	const letterBitmaps: PixelSpec['letterBitmaps'] = [];

	if (initials.length === 1) {
		letterBitmaps.push({
			bitmap: PIXEL_FONT[initials] || PIXEL_FONT['?'],
			startX: 25,
			startY: 25,
			cellSize: 10,
		});
	} else {
		letterBitmaps.push({
			bitmap: PIXEL_FONT[initials[0]] || PIXEL_FONT['?'],
			startX: 12,
			startY: 32,
			cellSize: 7,
		});
		letterBitmaps.push({
			bitmap: PIXEL_FONT[initials[1]] || PIXEL_FONT['?'],
			startX: 53,
			startY: 32,
			cellSize: 7,
		});
	}

	return {
		style: 'pixel',
		initials,
		palette,
		bgPixels,
		letterBitmaps,
	};
}
