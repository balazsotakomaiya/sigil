import { resolve } from '@sigil-ts/core';
import type { AvatarRequest, StyleId } from '@sigil-ts/core';
import { renderSpec } from './renderers/index';

export interface AvatarOptions {
	style?: StyleId;
	size?: number;
}

export function avatar(name: string, options: AvatarOptions = {}): string {
	const { style = 'grain', size = 80 } = options;
	const spec = resolve(name, style);
	return renderSpec(spec, size);
}

export { renderSpec } from './renderers/index';
export {
	renderGrain,
	renderFaces,
	renderTerminal,
	renderPixel,
	renderBrutalist,
	renderBots,
	renderGhosts,
	renderBloom,
} from './renderers/index';
export type { StyleId } from '@sigil-ts/core';
