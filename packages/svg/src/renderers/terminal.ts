import type { TerminalSpec } from 'sigil-core';

export function renderTerminal(spec: TerminalSpec, size: number): string {
	const { initials, palette, fontSize, promptStyle, topBar, statusLine, showCursor, hashValue } =
		spec;
	const uid = `tm${hashValue}`;

	// Scanlines
	let scanlines = '';
	for (let y = 0; y < 100; y += 4) {
		scanlines += `<rect x="0" y="${y}" width="100" height="1.5" fill="${palette.fg}" opacity="0.03"/>`;
	}

	// Prompt character
	let promptChar = '';
	let promptX = 0;
	if (promptStyle === 0) {
		promptChar = '>';
		promptX = initials.length === 1 ? 24 : 14;
	} else if (promptStyle === 1) {
		promptChar = '$';
		promptX = initials.length === 1 ? 24 : 14;
	} else if (promptStyle === 2) {
		promptChar = '~';
		promptX = initials.length === 1 ? 22 : 12;
	}
	// promptStyle 3 = no prompt

	// Top bar decoration
	let topDecor = '';
	if (topBar === 0) {
		topDecor = `<circle cx="14" cy="12" r="3" fill="${palette.fg}" opacity="0.2"/>
    <circle cx="24" cy="12" r="3" fill="${palette.fg}" opacity="0.14"/>
    <circle cx="34" cy="12" r="3" fill="${palette.fg}" opacity="0.08"/>`;
	} else if (topBar === 1) {
		topDecor = `<text x="12" y="14" fill="${palette.dim}" font-family="'IBM Plex Mono', monospace" font-size="7" opacity="0.6">~/usr</text>`;
	}

	// Bottom status line
	let bottomDecor = '';
	if (statusLine === 0) {
		bottomDecor = `<rect x="0" y="88" width="100" height="12" fill="${palette.fg}" opacity="0.05"/>
    <text x="8" y="96" fill="${palette.dim}" font-family="'IBM Plex Mono', monospace" font-size="6" opacity="0.5">pid:${hashValue % 9999}</text>
    <text x="76" y="96" fill="${palette.dim}" font-family="'IBM Plex Mono', monospace" font-size="6" opacity="0.5">0:00</text>`;
	} else if (statusLine === 1) {
		bottomDecor = `<line x1="10" y1="90" x2="90" y2="90" stroke="${palette.fg}" stroke-width="0.5" opacity="0.1"/>`;
	}

	// Glow opacity (disable for light-mode palette)
	const glowOpacity = palette.bg === '#F5F5F0' ? 0 : 0.08;

	// Cursor positioning
	const cursorX = initials.length === 1 ? 62 : 68;

	// Build text elements
	const ghostText = `<text x="50" y="52" dy="0.35em" text-anchor="middle" fill="${palette.fg}" font-family="'IBM Plex Mono', 'SF Mono', monospace" font-size="${fontSize}" font-weight="500" filter="url(#${uid}_blur)" opacity="0.4">${promptChar ? `${promptChar} ` : ''}${initials}</text>`;

	let promptEl = '';
	if (promptChar) {
		promptEl = `<text x="${promptX}" y="52" dy="0.35em" fill="${palette.dim}" font-family="'IBM Plex Mono', monospace" font-size="${fontSize}" font-weight="400">${promptChar}</text>`;
	}

	const textX = promptChar ? promptX + (initials.length === 1 ? 20 : 16) : 50;
	const textAnchor = promptChar ? '' : ' text-anchor="middle"';
	const mainText = `<text x="${textX}" y="52" dy="0.35em"${textAnchor} fill="${palette.fg}" font-family="'IBM Plex Mono', 'SF Mono', monospace" font-size="${fontSize}" font-weight="600">${initials}</text>`;

	let cursorEl = '';
	if (showCursor) {
		const cx = promptChar
			? promptX + (initials.length === 1 ? 20 : 16) + initials.length * fontSize * 0.6 + 2
			: cursorX;
		cursorEl = `<rect x="${cx}" y="${52 - fontSize * 0.35}" width="${fontSize * 0.55}" height="${fontSize * 0.85}" fill="${palette.fg}" opacity="0.7"/>`;
	}

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <defs>
    <clipPath id="${uid}_c"><rect width="100" height="100" rx="8" ry="8"/></clipPath>
    <radialGradient id="${uid}_glow" cx="50%" cy="50%">
      <stop offset="0%" stop-color="${palette.fg}" stop-opacity="${glowOpacity}"/>
      <stop offset="100%" stop-color="${palette.fg}" stop-opacity="0"/>
    </radialGradient>
    <filter id="${uid}_blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="8"/>
    </filter>
  </defs>
  <g clip-path="url(#${uid}_c)">
    <rect width="100" height="100" fill="${palette.bg}"/>
    ${scanlines}
    <rect width="100" height="100" fill="url(#${uid}_glow)"/>
    ${ghostText}
    ${promptEl}
    ${mainText}
    ${cursorEl}
    ${topDecor}
    ${bottomDecor}
  </g>
</svg>`;
}
