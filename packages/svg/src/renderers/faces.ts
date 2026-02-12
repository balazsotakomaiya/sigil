import type { BorderRadius, FacesSpec } from '@sigil-ts/core';

export function renderFaces(spec: FacesSpec, size: number, borderRadius?: BorderRadius): string {
	const {
		initials,
		palette,
		eyeSpacing,
		eyeY,
		eyeSize,
		eyeShape,
		mouthStyle,
		mouthY,
		hasBrows,
		browOffset,
		noseStyle,
		hasBlush,
		hasFreckles,
		headTilt,
	} = spec;
	const { bg, color: col, accent } = palette;
	const brs = borderRadius === 'square' ? 's' : borderRadius === 'round' ? 'r' : 'q';
	const uid = `fc${initials}${eyeSpacing}${brs}`;
	const rx = borderRadius === 'square' ? 0 : borderRadius === 'round' ? 50 : 16;

	let eyes = '';
	if (eyeShape === 0) {
		eyes = `<circle cx="${50 - eyeSpacing}" cy="${eyeY}" r="${eyeSize}" fill="${col}"/>
    <circle cx="${50 + eyeSpacing}" cy="${eyeY}" r="${eyeSize}" fill="${col}"/>`;
	} else if (eyeShape === 1) {
		eyes = `<ellipse cx="${50 - eyeSpacing}" cy="${eyeY}" rx="${eyeSize * 0.7}" ry="${eyeSize * 1.2}" fill="${col}"/>
    <ellipse cx="${50 + eyeSpacing}" cy="${eyeY}" rx="${eyeSize * 0.7}" ry="${eyeSize * 1.2}" fill="${col}"/>`;
	} else {
		eyes = `<line x1="${50 - eyeSpacing - 4}" y1="${eyeY}" x2="${50 - eyeSpacing + 4}" y2="${eyeY}" stroke="${col}" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="${50 + eyeSpacing - 4}" y1="${eyeY}" x2="${50 + eyeSpacing + 4}" y2="${eyeY}" stroke="${col}" stroke-width="2.5" stroke-linecap="round"/>`;
	}

	let brows = '';
	if (hasBrows) {
		brows = `<line x1="${50 - eyeSpacing - 4}" y1="${eyeY - 8 + browOffset}" x2="${50 - eyeSpacing + 3}" y2="${eyeY - 9}" stroke="${col}" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="${50 + eyeSpacing - 3}" y1="${eyeY - 9}" x2="${50 + eyeSpacing + 4}" y2="${eyeY - 8 + browOffset}" stroke="${col}" stroke-width="1.8" stroke-linecap="round"/>`;
	}

	let mouth = '';
	if (mouthStyle === 0) {
		mouth = `<path d="M44 ${mouthY} Q50 ${mouthY + 7} 56 ${mouthY}" fill="none" stroke="${col}" stroke-width="2" stroke-linecap="round"/>`;
	} else if (mouthStyle === 1) {
		mouth = `<ellipse cx="50" cy="${mouthY + 1}" rx="5" ry="4.5" fill="${col}"/>`;
	} else if (mouthStyle === 2) {
		mouth = `<line x1="44" y1="${mouthY}" x2="56" y2="${mouthY}" stroke="${col}" stroke-width="2" stroke-linecap="round"/>`;
	} else {
		mouth = `<path d="M44 ${mouthY} Q47 ${mouthY + 4} 50 ${mouthY}" fill="none" stroke="${col}" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M50 ${mouthY} Q53 ${mouthY + 4} 56 ${mouthY}" fill="none" stroke="${col}" stroke-width="1.8" stroke-linecap="round"/>`;
	}

	let nose = '';
	if (noseStyle === 0) {
		nose = `<circle cx="50" cy="${eyeY + 10}" r="1.5" fill="${col}" opacity="0.5"/>`;
	} else if (noseStyle === 1) {
		nose = `<line x1="50" y1="${eyeY + 6}" x2="50" y2="${eyeY + 11}" stroke="${col}" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>`;
	}

	const blush = hasBlush
		? `<circle cx="${50 - eyeSpacing - 2}" cy="${eyeY + 8}" r="5" fill="${accent}" opacity="0.2"/>
  <circle cx="${50 + eyeSpacing + 2}" cy="${eyeY + 8}" r="5" fill="${accent}" opacity="0.2"/>`
		: '';

	const freckles = hasFreckles
		? `<circle cx="38" cy="50" r="1" fill="${col}" opacity="0.2"/>
  <circle cx="41" cy="52" r="1" fill="${col}" opacity="0.15"/>
  <circle cx="59" cy="49" r="1" fill="${col}" opacity="0.2"/>
  <circle cx="62" cy="51" r="1" fill="${col}" opacity="0.15"/>`
		: '';

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <defs>
    <clipPath id="${uid}_c"><rect width="100" height="100" rx="${rx}" ry="${rx}"/></clipPath>
  </defs>
  <g clip-path="url(#${uid}_c)">
    <rect width="100" height="100" fill="${bg}"/>
    <g transform="rotate(${headTilt}, 50, 50)">
      <ellipse cx="50" cy="47" rx="28" ry="30" fill="none" stroke="${col}" stroke-width="2.2"/>
      ${eyes}
      ${brows}
      ${nose}
      ${mouth}
      ${blush}
      ${freckles}
    </g>
    <text x="50" y="82" text-anchor="middle" fill="${col}" font-family="'Caveat', cursive" font-size="14" font-weight="600" opacity="0.7">${initials}</text>
  </g>
</svg>`;
}
