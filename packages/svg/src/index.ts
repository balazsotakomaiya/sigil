import { resolve } from 'sigil-core';
import type { AvatarRequest, StyleId } from 'sigil-core';
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
} from './renderers/index';
