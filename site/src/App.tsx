import type { BorderRadius, StyleId } from '@sigil-ts/core';
import { Avatar } from '@sigil-ts/react';
import { useState } from 'react';
import { CodeBlock } from './CodeBlock';

const STYLES: Array<{ id: StyleId; label: string; desc: string }> = [
	{
		id: 'bloom',
		label: 'Bloom',
		desc: 'Blurred orbs on dark backgrounds with heavy grain. Moody and atmospheric.',
	},
	{
		id: 'grain',
		label: 'Grain',
		desc: 'Film-grain texture via SVG noise with warm earthy palettes.',
	},
	{
		id: 'brutalist',
		label: 'Brutalist',
		desc: 'Stencil initials punched from a solid block. Zero decoration.',
	},
	{
		id: 'terminal',
		label: 'Terminal',
		desc: 'Monospace on dark backgrounds with CRT scanlines and phosphor glow.',
	},
	{
		id: 'pixel',
		label: 'Pixel',
		desc: 'Custom 5×5 pixel font rendered as SVG rects. Retro palettes.',
	},
	{
		id: 'ghosts',
		label: 'Ghosts',
		desc: 'Floating ghost characters with wavy bottoms, expressive eyes, and sparkles.',
	},
	{
		id: 'bots',
		label: 'Bots',
		desc: 'Geometric robots — square heads, screen visors, antenna variants.',
	},
	{
		id: 'faces',
		label: 'Faces',
		desc: 'Generative faces with eyes, brows, nose, and mouth — all from the name.',
	},
];

const SAMPLE_NAMES = ['Alice Chen', 'Bob M', 'Clara J', 'David Kim', 'Emma W', 'Fatima'];

const BRUTALIST_NAMES = ['Zara Quinn', 'Lex M', 'Ingrid Haupt', 'Otis Vane', 'Wu Jian', 'Petra K'];

type PkgManager = 'bun' | 'npm' | 'pnpm' | 'yarn';

const INSTALL_CMDS: Record<PkgManager, string> = {
	bun: 'bun add @sigil-ts/gen',
	npm: 'npm install @sigil-ts/gen',
	pnpm: 'pnpm add @sigil-ts/gen',
	yarn: 'yarn add @sigil-ts/gen',
};

const REACT_INSTALL_CMDS: Record<PkgManager, string> = {
	bun: 'bun add @sigil-ts/react',
	npm: 'npm install @sigil-ts/react',
	pnpm: 'pnpm add @sigil-ts/react',
	yarn: 'yarn add @sigil-ts/react',
};

const SVG_EXAMPLE = `import { avatar } from '@sigil-ts/gen';

const svg = avatar('Alice Chen', {
  style: 'grain',
  size: 64,
  borderRadius: 'round',
});

// Returns a complete SVG string
document.body.innerHTML = svg;`;

const REACT_EXAMPLE = `import { Avatar } from '@sigil-ts/react';

function UserProfile({ name }: { name: string }) {
  return (
    <Avatar
      name={name}
      style="grain"
      size={64}
      borderRadius="round"
    />
  );
}`;

function InstallBlock({
	pkgManager,
	setPkgManager,
}: {
	pkgManager: PkgManager;
	setPkgManager: (pm: PkgManager) => void;
}) {
	return (
		<div className="install-block">
			<div className="pkg-tabs">
				{(Object.keys(INSTALL_CMDS) as PkgManager[]).map((pm) => (
					<button
						type="button"
						key={pm}
						className={`pkg-tab ${pm === pkgManager ? 'active' : ''}`}
						onClick={() => setPkgManager(pm)}
					>
						{pm}
					</button>
				))}
			</div>
			<div className="install-cmd">
				<code>{INSTALL_CMDS[pkgManager]}</code>
				<button
					type="button"
					className="copy-btn"
					onClick={() => navigator.clipboard.writeText(INSTALL_CMDS[pkgManager])}
					aria-label="Copy to clipboard"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						role="img"
					>
						<title>Copy</title>
						<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
						<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
					</svg>
				</button>
			</div>
		</div>
	);
}

type UsageTab = 'svg' | 'react';

function UsageSection({ pkgManager }: { pkgManager: PkgManager }) {
	const [tab, setTab] = useState<UsageTab>('svg');

	return (
		<section className="section" id="usage">
			<div className="section-label">Usage</div>
			<h2 className="section-title">Drop in anywhere</h2>
			<p className="section-desc">
				Use the SVG package for raw strings, or the React component for declarative rendering.
			</p>

			<div className="usage-grid">
				<div className="usage-card">
					<div className="usage-tabs">
						<button
							type="button"
							className={`usage-tab ${tab === 'svg' ? 'active' : ''}`}
							onClick={() => setTab('svg')}
						>
							sigil
						</button>
						<button
							type="button"
							className={`usage-tab ${tab === 'react' ? 'active' : ''}`}
							onClick={() => setTab('react')}
						>
							@sigil-ts/react
						</button>
					</div>
					<div className="usage-install">
						<code>{tab === 'svg' ? INSTALL_CMDS[pkgManager] : REACT_INSTALL_CMDS[pkgManager]}</code>
					</div>
					<CodeBlock code={tab === 'svg' ? SVG_EXAMPLE : REACT_EXAMPLE} />
				</div>

				<div className="usage-preview">
					<div className="preview-label">Output</div>
					<div className="preview-avatars">
						{SAMPLE_NAMES.slice(0, 3).map((name) => (
							<div key={name} className="preview-avatar">
								<Avatar name={name} style="grain" size={56} />
								<span>{name}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

const BORDER_RADII: Array<{ id: BorderRadius; label: string }> = [
	{ id: 'square', label: 'Square' },
	{ id: 'squircle', label: 'Squircle' },
	{ id: 'round', label: 'Round' },
];

function BorderRadiusSection() {
	return (
		<section className="section" id="border-radius">
			<div className="section-label">Border Radius</div>
			<h2 className="section-title">Shape to fit</h2>
			<p className="section-desc">
				Every style supports three border radius options — square, squircle (default), and round.
			</p>

			<div className="br-showcase">
				{BORDER_RADII.map((br) => (
					<div key={br.id} className="br-group">
						<button
							type="button"
							className="br-label"
							onClick={() => navigator.clipboard.writeText(br.id)}
							title={`Copy "${br.id}"`}
						>
							{br.label}
							<svg
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								role="img"
							>
								<title>Copy</title>
								<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
								<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
							</svg>
						</button>
						<div className="br-avatars">
							<Avatar name="Alice Chen" style="bloom" size={56} borderRadius={br.id} />
							<Avatar name="Bob M" style="grain" size={56} borderRadius={br.id} />
							<Avatar name="Clara J" style="faces" size={56} borderRadius={br.id} />
							<Avatar name="David Kim" style="terminal" size={56} borderRadius={br.id} />
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

function StylesSection() {
	return (
		<section className="section" id="styles">
			<div className="section-label">Styles</div>
			<h2 className="section-title">Eight styles, one input</h2>
			<p className="section-desc">
				Every style is a pure function from name to avatar. Same name, same result — always.
			</p>

			<div className="styles-grid">
				{STYLES.map((style) => (
					<div key={style.id} className="style-card">
						<div className="style-card-header">
							<span className="style-card-name">{style.label}</span>
							<span className="style-card-id">{style.id}</span>
						</div>
						<p className="style-card-desc">{style.desc}</p>
						<div className="style-card-avatars">
							{(style.id === 'brutalist' ? BRUTALIST_NAMES : SAMPLE_NAMES).map((name) => (
								<Avatar key={name} name={name} style={style.id} size={44} />
							))}
						</div>
					</div>
				))}
				<div className="style-card style-card--soon">
					<div className="style-card-header">
						<span className="style-card-name">More coming</span>
						<span className="style-card-id">???</span>
					</div>
					<p className="style-card-desc">
						New styles are in the works. Have an idea?{' '}
						<a
							href="https://github.com/balazsotakomaiya/sigil/issues"
							target="_blank"
							rel="noopener noreferrer"
							className="soon-link"
						>
							Open an issue.
						</a>
					</p>
					<div className="soon-placeholder">
						<span>?</span>
						<span>?</span>
						<span>?</span>
					</div>
				</div>
			</div>
		</section>
	);
}

export function App() {
	const [name, setName] = useState('');
	const [pkgManager, setPkgManager] = useState<PkgManager>('bun');
	const displayName = name || 'Sigil';

	return (
		<div className="page">
			<div className="rulers" aria-hidden="true">
				<div className="ruler ruler--v ruler--left" />
				<div className="ruler ruler--v ruler--right" />
				<div className="ruler ruler--v ruler--content-left" />
				<div className="ruler ruler--v ruler--content-right" />
				<div className="ruler ruler--h ruler--top" />
				<div className="ruler ruler--h ruler--bottom" />
			</div>

			<nav className="nav">
				<span className="nav-logo">sigil</span>
				<div className="nav-links">
					<a href="#styles">Styles</a>
					<a href="#usage">Usage</a>
					<a
						href="https://github.com/balazsotakomaiya/sigil"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub
					</a>
				</div>
			</nav>

			<header className="hero">
				<div className="hero-badge">Deterministic avatar generation</div>
				<h1 className="hero-title">
					Beautiful avatars from
					<br />
					any string
				</h1>
				<p className="hero-desc">
					Zero dependencies. Drop‑in easy. Fully deterministic. Same name, same avatar — every
					single time.
				</p>

				<InstallBlock pkgManager={pkgManager} setPkgManager={setPkgManager} />

				<div className="hero-demo">
					<div className="demo-input-wrap">
						<input
							type="text"
							placeholder="Type any name..."
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="demo-input"
						/>
					</div>
					<div className="demo-row">
						{STYLES.map((s) => (
							<div key={s.id} className="demo-cell">
								<Avatar name={displayName} style={s.id} size={72} />
								<span className="demo-cell-label">{s.label}</span>
							</div>
						))}
					</div>
				</div>
			</header>

			<div className="ruler-divider" aria-hidden="true" />
			<StylesSection />
			<div className="ruler-divider" aria-hidden="true" />
			<BorderRadiusSection />
			<div className="ruler-divider" aria-hidden="true" />
			<UsageSection pkgManager={pkgManager} />
			<div className="ruler-divider" aria-hidden="true" />

			<footer className="footer">
				<div className="footer-inner">
					<span className="footer-logo">sigil</span>
					<span className="footer-sep">·</span>
					<a
						href="https://github.com/balazsotakomaiya/sigil"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub
					</a>
					<span className="footer-sep">·</span>
					<a
						href="https://www.npmjs.com/package/@sigil-ts/gen"
						target="_blank"
						rel="noopener noreferrer"
					>
						npm
					</a>
				</div>
				<div className="footer-credit">
					Made by{' '}
					<a
						href="https://otakomaiya.com"
						target="_blank"
						rel="noopener noreferrer"
						className="footer-credit-link"
					>
						Balazs Otakomaiya
					</a>
				</div>
			</footer>
		</div>
	);
}
