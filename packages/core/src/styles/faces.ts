import { fnv1a, seeded } from '../hash';
import { extractInitials } from '../initials';
import { FACE_ACCENTS, FACE_BGS, FACE_COLORS } from '../palettes';
import type { FacesSpec } from '../types';

export function facesStyle(name: string): FacesSpec {
	const initials = extractInitials(name);
	const h = fnv1a(name.trim().toLowerCase());

	const bg = FACE_BGS[h % FACE_BGS.length];
	const color = FACE_COLORS[seeded(h, 1) % FACE_COLORS.length];
	const accent = FACE_ACCENTS[seeded(h, 2) % FACE_ACCENTS.length];

	return {
		style: 'faces',
		initials,
		palette: { bg, color, accent },
		eyeSpacing: 13 + (seeded(h, 3) % 6),
		eyeY: 40 + (seeded(h, 4) % 6),
		eyeSize: 3 + (seeded(h, 5) % 3),
		eyeShape: seeded(h, 9) % 3,
		mouthStyle: seeded(h, 6) % 4,
		mouthY: 60 + (seeded(h, 11) % 5),
		hasBrows: seeded(h, 13) % 2 === 0,
		browOffset: seeded(h, 14) % 2 === 0 ? -2 : 1,
		noseStyle: seeded(h, 10) % 3,
		hasBlush: seeded(h, 7) % 3 === 0,
		hasFreckles: seeded(h, 12) % 4 === 0,
		headTilt: -4 + (seeded(h, 8) % 9),
	};
}
