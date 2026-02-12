import type { StyleId } from '@sigil-ts/core';
import { Avatar } from '@sigil-ts/react';
import { useState } from 'react';

const STYLES: Array<{ id: StyleId; name: string; desc: string }> = [
	{
		id: 'grain',
		name: 'Grain',
		desc: 'Film-grain texture via SVG noise, warm earthy palettes with soft accent blobs. Instrument Serif — warm, organic, literary. Feels like a magazine masthead.',
	},
	{
		id: 'faces',
		name: 'Faces',
		desc: 'Hash-driven generative faces: eyes, brows, nose, mouth, blush, freckles — all derived from the name. Parchment background, handwritten label. Every person gets a unique little character.',
	},
	{
		id: 'terminal',
		name: 'Terminal',
		desc: 'Clean monospace on dark backgrounds with CRT scanlines, soft phosphor glow, optional prompt characters and status bars. Palettes range from classic green/amber to Tokyo Night.',
	},
	{
		id: 'pixel',
		name: 'Pixel',
		desc: 'Custom 5×5 pixel font rendered as SVG rects. Gameboy, Pico-8, synthwave, and matrix palettes. Scattered pixel debris for texture.',
	},
	{
		id: 'brutalist',
		name: 'Brutalist',
		desc: 'Knockout stencil — monospace initials punched out of a solid block, revealing the background through the letterforms. Industrial palettes, zero decoration.',
	},
	{
		id: 'bots',
		name: 'Bots',
		desc: 'Geometric robots on dark backgrounds — square/pill/round heads, screen visors, antenna variants, body panel details.',
	},
	{
		id: 'ghosts',
		name: 'Ghosts',
		desc: 'Translucent floating ghost characters with wavy bottoms, big expressive eyes, blush cheeks, and tiny sparkles.',
	},
	{
		id: 'bloom',
		name: 'Bloom',
		desc: 'One dominant blurred orb plus a small spark. Heavy grain overlay, DM Sans typography. Moody and atmospheric.',
	},
];

const NAMES = [
	'Alice Chen',
	'Bob M',
	'Clara J',
	'David Kim',
	'Emma W',
	'Fatima',
	'George Tanaka',
	'Hannah O',
];

function AvatarCell({ name, style, size = 80 }: { name: string; style: StyleId; size?: number }) {
	return (
		<div className="avatar-cell">
			<Avatar name={name} style={style} size={size} />
			<span>{name}</span>
		</div>
	);
}

function StyleSection({
	style,
	index,
	isLast,
}: {
	style: (typeof STYLES)[number];
	index: number;
	isLast: boolean;
}) {
	return (
		<>
			<div className="style-section">
				<div className="style-header">
					<span className="style-number">{String(index + 1).padStart(2, '0')}</span>
					<span className="style-name">{style.name}</span>
				</div>
				<p className="style-desc">{style.desc}</p>
				<div className="avatar-row">
					{NAMES.map((name) => (
						<AvatarCell key={name} name={name} style={style.id} />
					))}
				</div>
			</div>
			{!isLast && <hr className="divider" />}
		</>
	);
}

export function App() {
	const [userName, setUserName] = useState('Balazs Otakomaiya');

	return (
		<>
			<h1 className="page-title">Sigil</h1>
			<p className="page-sub">
				Eight avatar styles generated deterministically from any name. Type a name below to see your
				avatar in every style.
			</p>

			<div className="input-area">
				<div className="input-label">Try your name</div>
				<input
					type="text"
					placeholder="Type any name..."
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
			</div>

			<div id="userRow">
				{STYLES.map((s) => (
					<div key={s.id} className="avatar-cell">
						<Avatar name={userName || 'Anonymous'} style={s.id} size={88} />
						<span>{s.name}</span>
					</div>
				))}
			</div>

			<hr className="divider" />

			{STYLES.map((style, i) => (
				<StyleSection key={style.id} style={style} index={i} isLast={i === STYLES.length - 1} />
			))}
		</>
	);
}
