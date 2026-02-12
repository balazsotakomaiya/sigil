import { resolve } from '@sigil-ts/core';
import type { AvatarRequest, BorderRadius, StyleId } from '@sigil-ts/core';
import { renderSpec } from './renderers/index';

export interface AvatarOptions {
	style?: StyleId;
	size?: number;
	borderRadius?: BorderRadius;
}

export function avatar(name: string, options: AvatarOptions = {}): string {
	const { style = 'grain', size = 80, borderRadius } = options;
	const spec = resolve(name, style);
	return renderSpec(spec, size, borderRadius);
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
export type { StyleId, BorderRadius } from '@sigil-ts/core';
