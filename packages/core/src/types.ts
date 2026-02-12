export type StyleId =
	| 'grain'
	| 'faces'
	| 'terminal'
	| 'pixel'
	| 'brutalist'
	| 'bots'
	| 'ghosts'
	| 'bloom';

export type BorderRadius = 'square' | 'squircle' | 'round';

export interface AvatarRequest {
	name: string;
	style: StyleId;
	size?: number;
}

// ── Grain ──────────────────────────────────────────────────
export interface GrainSpec {
	style: 'grain';
	initials: string;
	palette: { bg: string; accent: string };
	blobs: Array<{ cx: number; cy: number; r: number; opacity: number }>;
	noiseFreq: number;
	noiseSeed: number;
	fontSize: number;
}

// ── Faces ──────────────────────────────────────────────────
export interface FacesSpec {
	style: 'faces';
	initials: string;
	palette: { bg: string; color: string; accent: string };
	eyeSpacing: number;
	eyeY: number;
	eyeSize: number;
	eyeShape: number; // 0=round, 1=oval, 2=line
	mouthStyle: number; // 0=smile, 1=open, 2=flat, 3=cat
	mouthY: number;
	hasBrows: boolean;
	browOffset: number;
	noseStyle: number; // 0=dot, 1=line, 2=none
	hasBlush: boolean;
	hasFreckles: boolean;
	headTilt: number;
}

// ── Terminal ───────────────────────────────────────────────
export interface TerminalSpec {
	style: 'terminal';
	initials: string;
	palette: { bg: string; fg: string; dim: string };
	fontSize: number;
	promptStyle: number; // 0='>', 1='$', 2='~', 3=none
	topBar: number; // 0=dots, 1=path, 2=none
	statusLine: number; // 0=pid bar, 1=line, 2=none
	showCursor: boolean;
	hashValue: number;
}

// ── Pixel ──────────────────────────────────────────────────
export interface PixelSpec {
	style: 'pixel';
	initials: string;
	palette: { bg: string; fg: string; hi: string };
	bgPixels: Array<{ x: number; y: number; size: number; useHi: boolean; opacity: number }>;
	letterBitmaps: Array<{ bitmap: number[]; startX: number; startY: number; cellSize: number }>;
}

// ── Brutalist ──────────────────────────────────────────────
export interface BrutalistSpec {
	style: 'brutalist';
	initials: string;
	palette: { bg: string; fg: string };
	fontSize: number;
}

// ── Bots ────────────────────────────────────────────────────
export interface BotsSpec {
	style: 'bots';
	initials: string;
	palette: { bg: string; body: string; screen: string };
	headShape: number;
	headW: number;
	headH: number;
	visorType: number;
	eyeType: number;
	antennaType: number;
	bodyW: number;
	bodyH: number;
	armType: number;
	legType: number;
	panelType: number;
}

// ── Ghosts ───────────────────────────────────────────────────
export interface GhostsSpec {
	style: 'ghosts';
	initials: string;
	palette: { bg: string; color: string; cheek: string };
	bodyW: number;
	bodyTop: number;
	bodyBottom: number;
	numWaves: number;
	waveAmp: number;
	eyeType: number;
	eyeY: number;
	eyeSpacing: number;
	mouthType: number;
	mouthY: number;
	hasBlush: boolean;
	floatY: number;
	tilt: number;
	sparkles: Array<{ cx: number; cy: number; r: number }>;
}

// ── Bloom ────────────────────────────────────────────────────
export interface BloomSpec {
	style: 'bloom';
	initials: string;
	palette: { bg: string; orbs: [string, string] };
	mainOrb: { cx: number; cy: number; r: number };
	sparkOrb: { cx: number; cy: number };
	grainSeed: number;
	fontSize: number;
}

export type AvatarSpec =
	| GrainSpec
	| FacesSpec
	| TerminalSpec
	| PixelSpec
	| BrutalistSpec
	| BotsSpec
	| GhostsSpec
	| BloomSpec;

export type StyleFunction = (name: string) => AvatarSpec;
