import type { BotsSpec } from '@sigil-ts/core';

export function renderBots(spec: BotsSpec, size: number): string {
	const { initials, palette, headShape, headW, headH, visorType, eyeType, antennaType, bodyW, bodyH, armType, legType, panelType } = spec;
	const uid = `bt${initials.toLowerCase()}${headW}`;
	const headY = 20;

	// Compute vertical bounds for centering
	let topY = headY;
	if (antennaType === 0) topY = headY - 12.5;
	else if (antennaType === 1) topY = headY - 11.5;
	else if (antennaType === 2) topY = headY - 12;

	const bYCalc = headY + headH + 2;
	let bottomY = bYCalc + bodyH;
	if (legType === 0 || legType === 2) bottomY = bYCalc + bodyH + 8;
	else if (legType === 1) bottomY = bYCalc + bodyH + 6;

	const offsetY = (100 - (bottomY - topY)) / 2 - topY;

	// Head
	let head = '';
	if (headShape === 0) head = `<rect x="${50 - headW / 2}" y="${headY}" width="${headW}" height="${headH}" rx="4" fill="${palette.body}"/>`;
	else if (headShape === 1) head = `<rect x="${50 - headW / 2}" y="${headY}" width="${headW}" height="${headH}" rx="${headH / 2}" fill="${palette.body}"/>`;
	else head = `<rect x="${50 - headW / 2}" y="${headY}" width="${headW}" height="${headH}" rx="2" fill="${palette.body}"/>`;

	// Visor
	let visor = '';
	const visorY = headY + 5;
	if (visorType === 0) visor = `<rect x="${50 - headW / 2 + 4}" y="${visorY}" width="${headW - 8}" height="${headH - 10}" rx="2" fill="${palette.screen}"/>`;
	else if (visorType === 1) visor = `<rect x="${50 - headW / 2 + 3}" y="${visorY}" width="${headW - 6}" height="${headH - 12}" rx="${(headH - 12) / 2}" fill="${palette.screen}"/>`;
	else if (visorType === 2) visor = `<circle cx="${50 - 6}" cy="${visorY + 4}" r="4" fill="${palette.screen}"/><circle cx="${50 + 6}" cy="${visorY + 4}" r="4" fill="${palette.screen}"/>`;
	else visor = `<rect x="${50 - headW / 2 + 4}" y="${visorY}" width="${headW - 8}" height="4" rx="2" fill="${palette.screen}"/>`;

	// Eyes on visor
	let eyes = '';
	const eY = visorY + (visorType < 2 ? (headH - 12) / 2 : 4);
	if (eyeType === 0) eyes = `<rect x="${50 - 8}" y="${eY - 1}" width="4" height="4" rx="0.5" fill="${palette.body}"/><rect x="${50 + 4}" y="${eY - 1}" width="4" height="4" rx="0.5" fill="${palette.body}"/>`;
	else if (eyeType === 1) eyes = `<circle cx="${50 - 6}" cy="${eY + 1}" r="2.5" fill="${palette.body}"/><circle cx="${50 + 6}" cy="${eY + 1}" r="2.5" fill="${palette.body}"/>`;
	else if (eyeType === 2) eyes = `<line x1="${50 - 9}" y1="${eY + 1}" x2="${50 - 3}" y2="${eY + 1}" stroke="${palette.body}" stroke-width="2" stroke-linecap="round"/><line x1="${50 + 3}" y1="${eY + 1}" x2="${50 + 9}" y2="${eY + 1}" stroke="${palette.body}" stroke-width="2" stroke-linecap="round"/>`;
	else if (eyeType === 3) eyes = `<polygon points="${50 - 6},${eY - 1} ${50 - 3},${eY + 3} ${50 - 9},${eY + 3}" fill="${palette.body}"/><polygon points="${50 + 6},${eY - 1} ${50 + 9},${eY + 3} ${50 + 3},${eY + 3}" fill="${palette.body}"/>`;
	else eyes = `<circle cx="${50 - 6}" cy="${eY + 1}" r="3" fill="${palette.body}" opacity="0.5"/><circle cx="${50 - 6}" cy="${eY + 1}" r="1.5" fill="${palette.body}"/><circle cx="${50 + 6}" cy="${eY + 1}" r="3" fill="${palette.body}" opacity="0.5"/><circle cx="${50 + 6}" cy="${eY + 1}" r="1.5" fill="${palette.body}"/>`;

	// Antenna
	let antenna = '';
	if (antennaType === 0) antenna = `<line x1="50" y1="${headY}" x2="50" y2="${headY - 8}" stroke="${palette.body}" stroke-width="1.5"/><circle cx="50" cy="${headY - 10}" r="2.5" fill="${palette.body}"/>`;
	else if (antennaType === 1) antenna = `<line x1="50" y1="${headY}" x2="45" y2="${headY - 10}" stroke="${palette.body}" stroke-width="1.5"/><line x1="50" y1="${headY}" x2="55" y2="${headY - 10}" stroke="${palette.body}" stroke-width="1.5"/><circle cx="45" cy="${headY - 10}" r="1.5" fill="${palette.body}"/><circle cx="55" cy="${headY - 10}" r="1.5" fill="${palette.body}"/>`;
	else if (antennaType === 2) antenna = `<polyline points="50,${headY} 50,${headY - 6} 54,${headY - 10}" fill="none" stroke="${palette.body}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="54" cy="${headY - 10}" r="2" fill="${palette.body}"/>`;

	// Body
	const bY = headY + headH + 2;
	const body = `<rect x="${50 - bodyW / 2}" y="${bY}" width="${bodyW}" height="${bodyH}" rx="3" fill="${palette.body}"/>`;

	// Arms
	let arms = '';
	if (armType === 0) arms = `<rect x="${50 - bodyW / 2 - 6}" y="${bY + 3}" width="5" height="${bodyH - 6}" rx="2" fill="${palette.body}"/><rect x="${50 + bodyW / 2 + 1}" y="${bY + 3}" width="5" height="${bodyH - 6}" rx="2" fill="${palette.body}"/>`;
	else if (armType === 1) arms = `<circle cx="${50 - bodyW / 2 - 5}" cy="${bY + bodyH / 2}" r="4" fill="${palette.body}"/><circle cx="${50 + bodyW / 2 + 5}" cy="${bY + bodyH / 2}" r="4" fill="${palette.body}"/>`;
	else if (armType === 2) arms = `<rect x="${50 - bodyW / 2 - 8}" y="${bY + 2}" width="7" height="4" rx="2" fill="${palette.body}"/><rect x="${50 + bodyW / 2 + 1}" y="${bY + 2}" width="7" height="4" rx="2" fill="${palette.body}"/>`;

	// Legs
	let legs = '';
	if (legType === 0) legs = `<rect x="${50 - 9}" y="${bY + bodyH}" width="6" height="8" rx="1" fill="${palette.body}"/><rect x="${50 + 3}" y="${bY + bodyH}" width="6" height="8" rx="1" fill="${palette.body}"/>`;
	else if (legType === 1) legs = `<rect x="${50 - 7}" y="${bY + bodyH}" width="4" height="6" rx="2" fill="${palette.body}"/><rect x="${50 + 3}" y="${bY + bodyH}" width="4" height="6" rx="2" fill="${palette.body}"/>`;
	else if (legType === 2) legs = `<circle cx="${50 - 6}" cy="${bY + bodyH + 4}" r="4" fill="${palette.body}"/><circle cx="${50 + 6}" cy="${bY + bodyH + 4}" r="4" fill="${palette.body}"/>`;

	// Panel detail
	let panel = '';
	if (panelType === 0) panel = `<circle cx="${50 - bodyW / 4}" cy="${bY + bodyH / 2}" r="1.5" fill="${palette.screen}"/><circle cx="${50 + bodyW / 4}" cy="${bY + bodyH / 2}" r="1.5" fill="${palette.screen}"/>`;
	else if (panelType === 1) panel = `<line x1="${50 - bodyW / 3}" y1="${bY + bodyH / 2}" x2="${50 + bodyW / 3}" y2="${bY + bodyH / 2}" stroke="${palette.screen}" stroke-width="1" stroke-linecap="round"/>`;
	else if (panelType === 2) panel = `<rect x="${50 - bodyW / 4}" y="${bY + 3}" width="${bodyW / 2}" height="3" rx="1" fill="${palette.screen}" opacity="0.5"/><rect x="${50 - bodyW / 4}" y="${bY + 8}" width="${bodyW / 2}" height="2" rx="1" fill="${palette.screen}" opacity="0.3"/>`;

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <defs><clipPath id="${uid}_c"><rect width="100" height="100" rx="16"/></clipPath></defs>
  <g clip-path="url(#${uid}_c)">
    <rect width="100" height="100" fill="${palette.bg}"/>
    <g transform="translate(0,${offsetY.toFixed(1)})">
    ${antenna}
    ${head}
    ${visor}
    ${eyes}
    ${body}
    ${panel}
    ${arms}
    ${legs}
    </g>
  </g></svg>`;
}
