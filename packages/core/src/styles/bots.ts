import { fnv1a, seeded } from '../hash';
import { extractInitials } from '../initials';
import { BOT_BGS, BOT_BODIES, BOT_SCREENS } from '../palettes';
import type { BotsSpec } from '../types';

export function botsStyle(name: string): BotsSpec {
	const initials = extractInitials(name);
	const h = fnv1a(name.trim().toLowerCase());

	const bg = BOT_BGS[h % BOT_BGS.length];
	const body = BOT_BODIES[seeded(h, 1) % BOT_BODIES.length];
	const screen = BOT_SCREENS[seeded(h, 1) % BOT_SCREENS.length];

	return {
		style: 'bots',
		initials,
		palette: { bg, body, screen },
		headShape: seeded(h, 2) % 3,
		headW: 28 + (seeded(h, 3) % 8),
		headH: 22 + (seeded(h, 4) % 8),
		visorType: seeded(h, 5) % 4,
		eyeType: seeded(h, 6) % 5,
		antennaType: seeded(h, 7) % 4,
		bodyW: 24 + (seeded(h, 8) % 8),
		bodyH: 18 + (seeded(h, 9) % 6),
		armType: seeded(h, 10) % 4,
		legType: seeded(h, 11) % 4,
		panelType: seeded(h, 12) % 4,
	};
}
