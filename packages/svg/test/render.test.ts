import { describe, expect, test } from 'bun:test';
import { avatar } from '../src/index';
import { renderSpec } from '../src/renderers/index';
import { grainStyle, facesStyle, brutalistStyle, terminalStyle, pixelStyle } from '@sigil/core';

describe('avatar()', () => {
	test('returns valid SVG string', () => {
		const svg = avatar('Alice Chen');
		expect(svg).toContain('<svg');
		expect(svg).toContain('</svg>');
		expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
	});

	test('respects size option', () => {
		const svg = avatar('Alice', { size: 120 });
		expect(svg).toContain('width="120"');
		expect(svg).toContain('height="120"');
	});

	test('respects style option', () => {
		const grain = avatar('Alice', { style: 'grain' });
		const pixel = avatar('Alice', { style: 'pixel' });
		expect(grain).not.toBe(pixel);
	});

	test('is deterministic', () => {
		const a = avatar('Balazs Otakomaiya', { style: 'faces' });
		const b = avatar('Balazs Otakomaiya', { style: 'faces' });
		expect(a).toBe(b);
	});

	test('different names produce different output', () => {
		const a = avatar('Alice');
		const b = avatar('Bob');
		expect(a).not.toBe(b);
	});
});

describe('renderSpec()', () => {
	test('renders grain spec', () => {
		const spec = grainStyle('Alice');
		const svg = renderSpec(spec, 80);
		expect(svg).toContain('<svg');
		expect(svg).toContain('Instrument Serif');
	});

	test('renders faces spec', () => {
		const spec = facesStyle('Alice');
		const svg = renderSpec(spec, 80);
		expect(svg).toContain('<svg');
		expect(svg).toContain('ellipse');
	});

	test('renders brutalist spec', () => {
		const spec = brutalistStyle('Alice');
		const svg = renderSpec(spec, 80);
		expect(svg).toContain('<svg');
		expect(svg).toContain('Space Mono');
	});

	test('renders terminal spec', () => {
		const spec = terminalStyle('Alice');
		const svg = renderSpec(spec, 80);
		expect(svg).toContain('<svg');
		expect(svg).toContain('IBM Plex Mono');
	});

	test('renders pixel spec', () => {
		const spec = pixelStyle('Alice');
		const svg = renderSpec(spec, 80);
		expect(svg).toContain('<svg');
		expect(svg).toContain('crispEdges');
	});

	test('all styles produce valid SVG for various names', () => {
		const names = ['Alice Chen', 'Bob M', 'Clara', 'Fatima', 'X'];
		const styles = [grainStyle, facesStyle, brutalistStyle, terminalStyle, pixelStyle] as const;

		for (const name of names) {
			for (const styleFn of styles) {
				const spec = styleFn(name);
				const svg = renderSpec(spec, 80);
				expect(svg).toContain('<svg');
				expect(svg).toContain('</svg>');
			}
		}
	});
});
