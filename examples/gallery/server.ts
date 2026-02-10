import { avatar } from '@sigil/svg';
import type { StyleId } from '@sigil/core';

const STYLES: Array<{ id: StyleId; name: string; desc: string }> = [
	{
		id: 'grain',
		name: 'Grain',
		desc: 'Film-grain texture via SVG noise, warm earthy palettes with soft accent blobs. Libre Caslon Display italic — elegant, bigger, confident. Feels like a magazine masthead.',
	},
	{
		id: 'faces',
		name: 'Faces',
		desc: 'Hash-driven generative faces: eyes, brows, nose, mouth, blush, freckles — all derived from the name. Parchment background, handwritten label. Every person gets a unique little character.',
	},
	{
		id: 'brutalist',
		name: 'Brutalist',
		desc: 'Oversized monospace that bleeds off-canvas, harsh rotations, industrial color combos. Zero subtlety. For when your avatar needs to yell.',
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

function renderPage(userName: string): string {
	const userRow = STYLES.map(
		(s) =>
			`<div class="avatar-cell">${avatar(userName, { style: s.id, size: 88 })}<span>${s.name}</span></div>`,
	).join('\n');

	const sections = STYLES.map((style, i) => {
		const avatars = NAMES.map(
			(name) =>
				`<div class="avatar-cell">${avatar(name, { style: style.id, size: 80 })}<span>${name}</span></div>`,
		).join('\n');

		const divider = i < STYLES.length - 1 ? '<hr class="divider">' : '';

		return `<div class="style-section">
      <div class="style-header">
        <span class="style-number">${String(i + 1).padStart(2, '0')}</span>
        <span class="style-name">${style.name}</span>
      </div>
      <p class="style-desc">${style.desc}</p>
      <div class="avatar-row">${avatars}</div>
    </div>
    ${divider}`;
	}).join('\n');

	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sigil — Style Gallery</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Space+Mono:wght@400;700&family=Caveat:wght@600&family=Syne:wght@700;800&family=Playfair+Display:wght@700;900&family=Press+Start+2P&family=IBM+Plex+Mono:wght@400;500;600&family=Libre+Caslon+Display&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Syne', sans-serif;
    background: #111110;
    color: #d4d4c8;
    min-height: 100vh;
    padding: 56px 32px 80px;
  }
  .page-title {
    font-family: 'Playfair Display', serif;
    font-size: 40px;
    font-weight: 900;
    color: #f5f5ec;
    letter-spacing: -1px;
    margin-bottom: 6px;
  }
  .page-sub {
    font-size: 14px;
    color: #6b6b60;
    margin-bottom: 56px;
    max-width: 520px;
    line-height: 1.5;
  }
  .style-section { margin-bottom: 64px; }
  .style-header {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 6px;
  }
  .style-number {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    color: #4a4a40;
    min-width: 24px;
  }
  .style-name {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 20px;
    color: #e8e8dc;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .style-desc {
    font-size: 13px;
    color: #6b6b60;
    margin-bottom: 24px;
    margin-left: 36px;
    max-width: 600px;
    line-height: 1.5;
  }
  .avatar-row {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-left: 36px;
  }
  .avatar-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .avatar-cell span {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: #4a4a40;
  }
  .divider {
    border: none;
    border-top: 1px solid #1e1e1c;
    margin-bottom: 48px;
  }
  .input-area {
    margin-left: 36px;
    margin-bottom: 32px;
  }
  .input-area form { display: flex; gap: 8px; align-items: flex-end; }
  .input-area input {
    padding: 10px 16px;
    border-radius: 6px;
    border: 1px solid #2a2a26;
    background: #1a1a18;
    color: #e8e8dc;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    width: 280px;
    outline: none;
    transition: border-color 0.2s;
  }
  .input-area input:focus { border-color: #5a5a50; }
  .input-area input::placeholder { color: #3a3a34; }
  .input-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: #4a4a40;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  #userRow {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-left: 36px;
    margin-bottom: 56px;
  }
</style>
</head>
<body>
<h1 class="page-title">Sigil — Style Gallery</h1>
<p class="page-sub">Five avatar styles generated deterministically from any name. Type a name below to see your avatar in every style.</p>

<div class="input-area">
  <div class="input-label">Try your name</div>
  <form method="get" action="/">
    <input type="text" name="name" placeholder="Type any name..." value="${userName}" autofocus />
  </form>
</div>

<div id="userRow">${userRow}</div>
<hr class="divider">
${sections}
</body>
</html>`;
}

const server = Bun.serve({
	port: 3456,
	fetch(req) {
		const url = new URL(req.url);
		const name = url.searchParams.get('name') || 'Balazs Otakomaiya';
		return new Response(renderPage(name), {
			headers: { 'Content-Type': 'text/html; charset=utf-8' },
		});
	},
});

console.log(`🔮 Sigil gallery running at http://localhost:${server.port}`);
