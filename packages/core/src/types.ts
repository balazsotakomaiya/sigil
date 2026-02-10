export type StyleId = 'grain' | 'faces' | 'terminal' | 'pixel' | 'brutalist';

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

export type AvatarSpec =
	| GrainSpec
	| FacesSpec
	| TerminalSpec
	| PixelSpec
	| BrutalistSpec;

export type StyleFunction = (name: string) => AvatarSpec;
