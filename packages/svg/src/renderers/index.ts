import type { AvatarSpec, BorderRadius } from '@sigil-ts/core';
import { renderBloom } from './bloom';
import { renderBots } from './bots';
import { renderBrutalist } from './brutalist';
import { renderFaces } from './faces';
import { renderGhosts } from './ghosts';
import { renderGrain } from './grain';
import { renderPixel } from './pixel';
import { renderTerminal } from './terminal';

export function renderSpec(spec: AvatarSpec, size: number, borderRadius?: BorderRadius): string {
	switch (spec.style) {
		case 'grain':
			return renderGrain(spec, size, borderRadius);
		case 'faces':
			return renderFaces(spec, size, borderRadius);
		case 'terminal':
			return renderTerminal(spec, size, borderRadius);
		case 'pixel':
			return renderPixel(spec, size, borderRadius);
		case 'brutalist':
			return renderBrutalist(spec, size, borderRadius);
		case 'bots':
			return renderBots(spec, size, borderRadius);
		case 'ghosts':
			return renderGhosts(spec, size, borderRadius);
		case 'bloom':
			return renderBloom(spec, size, borderRadius);
	}
}

export {
	renderGrain,
	renderFaces,
	renderTerminal,
	renderPixel,
	renderBrutalist,
	renderBots,
	renderGhosts,
	renderBloom,
};
