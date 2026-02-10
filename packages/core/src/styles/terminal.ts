import { fnv1a, seeded } from '../hash';
import { extractInitials } from '../initials';
import { TERMINAL_PALETTES } from '../palettes';
import type { TerminalSpec } from '../types';

export function terminalStyle(name: string): TerminalSpec {
	const initials = extractInitials(name);
	const h = fnv1a(name.trim().toLowerCase());
	const palette = TERMINAL_PALETTES[h % TERMINAL_PALETTES.length];

	return {
		style: 'terminal',
		initials,
		palette,
		fontSize: initials.length === 1 ? 40 : 32,
		promptStyle: seeded(h, 1) % 4,
		topBar: seeded(h, 2) % 3,
		statusLine: seeded(h, 3) % 3,
		showCursor: seeded(h, 5) % 3 !== 0,
		hashValue: h,
	};
}
