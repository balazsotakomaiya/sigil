import { fnv1a, seeded } from '../hash';
import { extractInitials } from '../initials';
import { BLOOM_PALETTES } from '../palettes';
import type { BloomSpec } from '../types';

export function bloomStyle(name: string): BloomSpec {
	const initials = extractInitials(name);
	const h = fnv1a(name.trim().toLowerCase());
	const palette = BLOOM_PALETTES[h % BLOOM_PALETTES.length];

	const mainCx = 30 + (seeded(h, 1) % 40);
	const mainCy = 30 + (seeded(h, 2) % 40);
	const mainR = 32 + (seeded(h, 3) % 15);

	const sparkCx = (mainCx + 50) % 100;
	const sparkCy = (mainCy + 40) % 100;

	return {
		style: 'bloom',
		initials,
		palette,
		mainOrb: { cx: mainCx, cy: mainCy, r: mainR },
		sparkOrb: { cx: sparkCx, cy: sparkCy },
		grainSeed: h % 500,
		fontSize: initials.length === 1 ? 36 : 30,
	};
}
