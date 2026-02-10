import { describe, expect, test } from 'bun:test';
import { fnv1a, seeded } from '../src/hash';

describe('fnv1a', () => {
	test('returns a number', () => {
		expect(typeof fnv1a('hello')).toBe('number');
	});

	test('is deterministic', () => {
		expect(fnv1a('Alice Chen')).toBe(fnv1a('Alice Chen'));
		expect(fnv1a('Bob M')).toBe(fnv1a('Bob M'));
	});

	test('different inputs produce different hashes', () => {
		expect(fnv1a('Alice')).not.toBe(fnv1a('Bob'));
		expect(fnv1a('a')).not.toBe(fnv1a('b'));
	});

	test('returns unsigned 32-bit integer', () => {
		const h = fnv1a('test');
		expect(h).toBeGreaterThanOrEqual(0);
		expect(h).toBeLessThanOrEqual(0xffffffff);
	});

	test('empty string returns a valid hash', () => {
		const h = fnv1a('');
		expect(typeof h).toBe('number');
		expect(h).toBeGreaterThanOrEqual(0);
	});
});

describe('seeded', () => {
	test('same hash + index = same result', () => {
		const h = fnv1a('test');
		expect(seeded(h, 1)).toBe(seeded(h, 1));
	});

	test('different indices produce different results', () => {
		const h = fnv1a('test');
		expect(seeded(h, 0)).not.toBe(seeded(h, 1));
		expect(seeded(h, 1)).not.toBe(seeded(h, 2));
	});

	test('returns unsigned 32-bit integer', () => {
		const h = fnv1a('test');
		const s = seeded(h, 5);
		expect(s).toBeGreaterThanOrEqual(0);
		expect(s).toBeLessThanOrEqual(0xffffffff);
	});
});
