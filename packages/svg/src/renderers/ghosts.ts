import type { BorderRadius, GhostsSpec } from '@sigil-ts/core';

export function renderGhosts(spec: GhostsSpec, size: number, borderRadius?: BorderRadius): string {
	const {
		palette,
		bodyW,
		bodyTop,
		bodyBottom,
		numWaves,
		waveAmp,
		eyeType,
		eyeY,
		eyeSpacing,
		mouthType,
		mouthY,
		hasBlush,
		floatY,
		tilt,
		sparkles,
	} = spec;
	const brs = borderRadius === 'square' ? 's' : borderRadius === 'round' ? 'r' : 'q';
	const uid = `gh${bodyW}${eyeType}${brs}`;
	const rx = borderRadius === 'square' ? 0 : borderRadius === 'round' ? 50 : 16;

	// Build wavy bottom path
	const segW = (bodyW * 2) / numWaves;
	let bottomPath = '';
	for (let i = 0; i < numWaves; i++) {
		const sx = 50 - bodyW + i * segW;
		const ex = sx + segW;
		const dir = i % 2 === 0 ? 1 : -1;
		bottomPath += `Q${(sx + ex) / 2},${bodyBottom + waveAmp * dir} ${ex},${bodyBottom} `;
	}

	const ghostPath = `M${50 - bodyW},${bodyTop + bodyW} L${50 - bodyW},${bodyBottom} ${bottomPath} L${50 + bodyW},${bodyTop + bodyW} C${50 + bodyW},${bodyTop - bodyW * 0.5} ${50 - bodyW},${bodyTop - bodyW * 0.5} ${50 - bodyW},${bodyTop + bodyW} Z`;

	// Eyes
	let eyes = '';
	if (eyeType === 0)
		eyes = `<circle cx="${50 - eyeSpacing}" cy="${eyeY}" r="3.5" fill="${palette.bg}"/><circle cx="${50 + eyeSpacing}" cy="${eyeY}" r="3.5" fill="${palette.bg}"/>`;
	else if (eyeType === 1)
		eyes = `<ellipse cx="${50 - eyeSpacing}" cy="${eyeY}" rx="3" ry="4" fill="${palette.bg}"/><ellipse cx="${50 + eyeSpacing}" cy="${eyeY}" rx="3" ry="4" fill="${palette.bg}"/>`;
	else if (eyeType === 2)
		eyes = `<path d="M${50 - eyeSpacing - 3},${eyeY + 1} Q${50 - eyeSpacing},${eyeY - 3} ${50 - eyeSpacing + 3},${eyeY + 1}" fill="none" stroke="${palette.bg}" stroke-width="2.2" stroke-linecap="round"/><path d="M${50 + eyeSpacing - 3},${eyeY + 1} Q${50 + eyeSpacing},${eyeY - 3} ${50 + eyeSpacing + 3},${eyeY + 1}" fill="none" stroke="${palette.bg}" stroke-width="2.2" stroke-linecap="round"/>`;
	else if (eyeType === 3)
		eyes = `<circle cx="${50 - eyeSpacing}" cy="${eyeY}" r="4" fill="${palette.bg}"/><circle cx="${50 - eyeSpacing + 1}" cy="${eyeY - 1}" r="1.5" fill="${palette.color}"/><circle cx="${50 + eyeSpacing}" cy="${eyeY}" r="4" fill="${palette.bg}"/><circle cx="${50 + eyeSpacing + 1}" cy="${eyeY - 1}" r="1.5" fill="${palette.color}"/>`;
	else
		eyes = `<line x1="${50 - eyeSpacing - 3}" y1="${eyeY}" x2="${50 - eyeSpacing + 3}" y2="${eyeY}" stroke="${palette.bg}" stroke-width="2.5" stroke-linecap="round"/><line x1="${50 + eyeSpacing - 3}" y1="${eyeY}" x2="${50 + eyeSpacing + 3}" y2="${eyeY}" stroke="${palette.bg}" stroke-width="2.5" stroke-linecap="round"/>`;

	// Mouth
	let mouth = '';
	if (mouthType === 0)
		mouth = `<ellipse cx="50" cy="${mouthY}" rx="3.5" ry="3" fill="${palette.bg}"/>`;
	else if (mouthType === 1)
		mouth = `<path d="M47,${mouthY - 1} Q50,${mouthY + 4} 53,${mouthY - 1}" fill="none" stroke="${palette.bg}" stroke-width="1.8" stroke-linecap="round"/>`;
	else if (mouthType === 2)
		mouth = `<line x1="47" y1="${mouthY}" x2="53" y2="${mouthY}" stroke="${palette.bg}" stroke-width="1.8" stroke-linecap="round"/>`;
	else
		mouth = `<path d="M46,${mouthY - 1} Q48,${mouthY + 3} 50,${mouthY - 1} Q52,${mouthY + 3} 54,${mouthY - 1}" fill="none" stroke="${palette.bg}" stroke-width="1.5" stroke-linecap="round"/>`;

	// Blush
	const blush = hasBlush
		? `<circle cx="${50 - eyeSpacing - 2}" cy="${eyeY + 5}" r="4" fill="${palette.cheek}" opacity="0.25"/><circle cx="${50 + eyeSpacing + 2}" cy="${eyeY + 5}" r="4" fill="${palette.cheek}" opacity="0.25"/>`
		: '';

	// Sparkles
	const sparklesSvg = sparkles
		.map(
			(s) => `<circle cx="${s.cx}" cy="${s.cy}" r="${s.r}" fill="${palette.color}" opacity="0.2"/>`,
		)
		.join('');

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <defs><clipPath id="${uid}_c"><rect width="100" height="100" rx="${rx}"/></clipPath></defs>
  <g clip-path="url(#${uid}_c)">
    <rect width="100" height="100" fill="${palette.bg}"/>
    ${sparklesSvg}
    <g transform="translate(0,${floatY}) rotate(${tilt}, 50, 50)">
      <path d="${ghostPath}" fill="${palette.color}" opacity="0.85"/>
      ${eyes}
      ${mouth}
      ${blush}
    </g>
  </g></svg>`;
}
