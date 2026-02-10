import { describe, expect, test } from 'bun:test';
import { extractInitials } from '../src/initials';

describe('extractInitials', () => {
	test('two-word name returns first + last initials', () => {
		expect(extractInitials('Alice Chen')).toBe('AC');
		expect(extractInitials('Balazs Otakomaiya')).toBe('BO');
	});

	test('single name returns one initial', () => {
		expect(extractInitials('Fatima')).toBe('F');
	});

	test('three-word name uses first + last', () => {
		expect(extractInitials('George Michael Tanaka')).toBe('GT');
	});

	test('empty string returns ?', () => {
		expect(extractInitials('')).toBe('?');
		expect(extractInitials('   ')).toBe('?');
	});

	test('handles extra whitespace', () => {
		expect(extractInitials('  Alice   Chen  ')).toBe('AC');
	});

	test('returns uppercase', () => {
		expect(extractInitials('alice chen')).toBe('AC');
	});

	test('single letter name', () => {
		expect(extractInitials('a')).toBe('A');
	});
});
