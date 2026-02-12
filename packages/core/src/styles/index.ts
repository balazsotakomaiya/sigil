import type { AvatarSpec, StyleFunction, StyleId } from '../types';
import { facesStyle } from './faces';
import { grainStyle } from './grain';
import { pixelStyle } from './pixel';
import { terminalStyle } from './terminal';
import { brutalistStyle } from './brutalist';
import { botsStyle } from './bots';
import { ghostsStyle } from './ghosts';
import { bloomStyle } from './bloom';

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

export { grainStyle, facesStyle, terminalStyle, pixelStyle, brutalistStyle, botsStyle, ghostsStyle, bloomStyle };
