import { fnv1a, seeded } from '../hash';
import { extractInitials } from '../initials';
import { GRAIN_PALETTES } from '../palettes';
import type { GrainSpec } from '../types';

export function grainStyle(name: string): GrainSpec {
	const initials = extractInitials(name);
	const h = fnv1a(name.trim().toLowerCase());
	const palette = GRAIN_PALETTES[h % GRAIN_PALETTES.length];

	return {
		style: 'grain',
		initials,
		palette,
		blobs: [
			{
				cx: 25 + (seeded(h, 2) % 50),
				cy: 25 + (seeded(h, 3) % 50),
				r: 30 + (seeded(h, 4) % 25),
				opacity: 0.3,
			},
			{
				cx: 10 + (seeded(h, 5) % 80),
				cy: 60 + (seeded(h, 6) % 30),
				r: 15 + (seeded(h, 7) % 20),
				opacity: 0.18,
			},
		],
		noiseFreq: 0.55 + (seeded(h, 1) % 30) / 100,
		noiseSeed: h % 999,
		fontSize: initials.length === 1 ? 56 : 46,
	};
}
