import type { AvatarSpec } from '@sigil-ts/core';
import { renderFaces } from './faces';
import { renderGrain } from './grain';
import { renderPixel } from './pixel';
import { renderTerminal } from './terminal';
import { renderBrutalist } from './brutalist';
import { renderBots } from './bots';
import { renderGhosts } from './ghosts';
import { renderBloom } from './bloom';

export function renderSpec(spec: AvatarSpec, size: number): string {
	switch (spec.style) {
		case 'grain':
			return renderGrain(spec, size);
		case 'faces':
			return renderFaces(spec, size);
		case 'terminal':
			return renderTerminal(spec, size);
		case 'pixel':
			return renderPixel(spec, size);
		case 'brutalist':
			return renderBrutalist(spec, size);
		case 'bots':
			return renderBots(spec, size);
		case 'ghosts':
			return renderGhosts(spec, size);
		case 'bloom':
			return renderBloom(spec, size);
	}
}

export { renderGrain, renderFaces, renderTerminal, renderPixel, renderBrutalist, renderBots, renderGhosts, renderBloom };
