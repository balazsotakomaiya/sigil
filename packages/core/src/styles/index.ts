import type { AvatarSpec, StyleFunction, StyleId } from '../types';
import { bloomStyle } from './bloom';
import { botsStyle } from './bots';
import { brutalistStyle } from './brutalist';
import { facesStyle } from './faces';
import { ghostsStyle } from './ghosts';
import { grainStyle } from './grain';
import { pixelStyle } from './pixel';
import { terminalStyle } from './terminal';

const STYLES: Record<StyleId, StyleFunction> = {
	grain: grainStyle,
	faces: facesStyle,
	terminal: terminalStyle,
	pixel: pixelStyle,
	brutalist: brutalistStyle,
	bots: botsStyle,
	ghosts: ghostsStyle,
	bloom: bloomStyle,
} as const;

export function resolve(name: string, style: StyleId): AvatarSpec {
	return STYLES[style](name);
}

export {
	grainStyle,
	facesStyle,
	terminalStyle,
	pixelStyle,
	brutalistStyle,
	botsStyle,
	ghostsStyle,
	bloomStyle,
};
