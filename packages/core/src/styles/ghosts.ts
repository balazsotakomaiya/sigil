import { fnv1a, seeded } from '../hash';
import { extractInitials } from '../initials';
import { GHOST_BGS, GHOST_CHEEKS, GHOST_COLORS } from '../palettes';
import type { GhostsSpec } from '../types';

export function ghostsStyle(name: string): GhostsSpec {
	const initials = extractInitials(name);
	const h = fnv1a(name.trim().toLowerCase());

	const bg = GHOST_BGS[h % GHOST_BGS.length];
	const color = GHOST_COLORS[seeded(h, 1) % GHOST_COLORS.length];
	const cheek = GHOST_CHEEKS[seeded(h, 1) % GHOST_CHEEKS.length];

	const bodyW = 28 + (seeded(h, 2) % 8);
	const bodyTop = 22 + (seeded(h, 3) % 6);
	const bodyBottom = 72 + (seeded(h, 4) % 6);
	const numWaves = 3 + (seeded(h, 5) % 3);
	const waveAmp = 4 + (seeded(h, 6) % 4);

	const eyeY = bodyTop + bodyW * 0.6 + 2;
	const eyeSpacing = 7 + (seeded(h, 8) % 4);
	const mouthY = eyeY + 8;

	const numSparkles = 2 + (seeded(h, 13) % 3);
	const sparkles: Array<{ cx: number; cy: number; r: number }> = [];
	for (let i = 0; i < numSparkles; i++) {
		sparkles.push({
			cx: 15 + (seeded(h, i + 30) % 70),
			cy: 15 + (seeded(h, i + 40) % 70),
			r: 1 + (seeded(h, i + 50) % 2),
		});
	}

	return {
		style: 'ghosts',
		initials,
		palette: { bg, color, cheek },
		bodyW,
		bodyTop,
		bodyBottom,
		numWaves,
		waveAmp,
		eyeType: seeded(h, 7) % 5,
		eyeY,
		eyeSpacing,
		mouthType: seeded(h, 9) % 4,
		mouthY,
		hasBlush: seeded(h, 10) % 2 === 0,
		floatY: -3 + (seeded(h, 11) % 7),
		tilt: -3 + (seeded(h, 12) % 7),
		sparkles,
	};
}
