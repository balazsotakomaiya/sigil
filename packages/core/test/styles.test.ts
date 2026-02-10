import { describe, expect, test } from 'bun:test';
import { resolve } from '../src/styles/index';
import { grainStyle } from '../src/styles/grain';
import { facesStyle } from '../src/styles/faces';
import { brutalistStyle } from '../src/styles/brutalist';
import { terminalStyle } from '../src/styles/terminal';
import { pixelStyle } from '../src/styles/pixel';

describe('style functions', () => {
	const names = ['Alice Chen', 'Bob M', 'Fatima', 'George Tanaka', 'X'];

	test('grainStyle returns correct shape', () => {
		for (const name of names) {
			const spec = grainStyle(name);
			expect(spec.style).toBe('grain');
			expect(spec.initials).toBeTruthy();
			expect(spec.palette.bg).toMatch(/^#/);
			expect(spec.palette.accent).toMatch(/^#/);
			expect(spec.blobs.length).toBe(2);
			expect(spec.fontSize).toBeGreaterThan(0);
		}
	});

	test('facesStyle returns correct shape', () => {
		for (const name of names) {
			const spec = facesStyle(name);
			expect(spec.style).toBe('faces');
			expect(spec.eyeSpacing).toBeGreaterThanOrEqual(13);
			expect(spec.eyeShape).toBeGreaterThanOrEqual(0);
			expect(spec.eyeShape).toBeLessThan(3);
			expect(spec.mouthStyle).toBeGreaterThanOrEqual(0);
			expect(spec.mouthStyle).toBeLessThan(4);
		}
	});

	test('brutalistStyle returns correct shape', () => {
		for (const name of names) {
			const spec = brutalistStyle(name);
			expect(spec.style).toBe('brutalist');
			expect(spec.palette.bg).toMatch(/^#/);
			expect(spec.fontSize).toBeGreaterThan(0);
		}
	});

	test('terminalStyle returns correct shape', () => {
		for (const name of names) {
			const spec = terminalStyle(name);
			expect(spec.style).toBe('terminal');
			expect(spec.palette.bg).toMatch(/^#/);
			expect(spec.palette.fg).toMatch(/^#/);
			expect(spec.palette.dim).toMatch(/^#/);
			expect(spec.promptStyle).toBeGreaterThanOrEqual(0);
			expect(spec.promptStyle).toBeLessThan(4);
		}
	});

	test('pixelStyle returns correct shape', () => {
		for (const name of names) {
			const spec = pixelStyle(name);
			expect(spec.style).toBe('pixel');
			expect(spec.bgPixels.length).toBe(12);
			expect(spec.letterBitmaps.length).toBeGreaterThanOrEqual(1);
		}
	});

	test('resolve dispatches correctly', () => {
		expect(resolve('Alice', 'grain').style).toBe('grain');
		expect(resolve('Alice', 'faces').style).toBe('faces');
		expect(resolve('Alice', 'brutalist').style).toBe('brutalist');
		expect(resolve('Alice', 'terminal').style).toBe('terminal');
		expect(resolve('Alice', 'pixel').style).toBe('pixel');
	});

	test('styles are deterministic', () => {
		const a1 = grainStyle('Alice Chen');
		const a2 = grainStyle('Alice Chen');
		expect(a1).toEqual(a2);

		const b1 = facesStyle('Bob');
		const b2 = facesStyle('Bob');
		expect(b1).toEqual(b2);
	});
});
