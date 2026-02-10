import { fnv1a } from '../hash';
import { extractInitials } from '../initials';
import { BRUTALIST_PALETTES } from '../palettes';
import type { BrutalistSpec } from '../types';

export function brutalistStyle(name: string): BrutalistSpec {
	const initials = extractInitials(name);
	const h = fnv1a(name.trim().toLowerCase());
	const palette = BRUTALIST_PALETTES[h % BRUTALIST_PALETTES.length];

	return {
		style: 'brutalist',
		initials,
		palette,
		fontSize: initials.length === 1 ? 80 : 64,
	};
}
