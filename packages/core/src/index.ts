export { fnv1a, seeded } from './hash';
export { extractInitials } from './initials';
export {
	GRAIN_PALETTES,
	FACE_BGS,
	FACE_COLORS,
	FACE_ACCENTS,
	TERMINAL_PALETTES,
	PIXEL_PALETTES,
	BRUTALIST_PALETTES,
} from './palettes';
export { PIXEL_FONT } from './pixel-font';
export {
	resolve,
	grainStyle,
	facesStyle,
	terminalStyle,
	pixelStyle,
	brutalistStyle,
} from './styles/index';
export type {
	StyleId,
	AvatarRequest,
	AvatarSpec,
	StyleFunction,
	GrainSpec,
	FacesSpec,
	TerminalSpec,
	PixelSpec,
	BrutalistSpec,
} from './types';
