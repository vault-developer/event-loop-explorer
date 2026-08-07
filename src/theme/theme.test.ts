import { describe, expect, it } from 'vitest';
import { DEFAULT_THEME, resolveThemeId } from '@/theme';

describe('resolveThemeId', () => {
	it('migrates legacy dark to midnight', () => {
		expect(resolveThemeId('dark')).toBe('midnight');
	});

	it('migrates legacy light to paper', () => {
		expect(resolveThemeId('light')).toBe('paper');
	});

	it('keeps known theme ids', () => {
		expect(resolveThemeId('nord')).toBe('nord');
		expect(resolveThemeId('github')).toBe('github');
		expect(resolveThemeId('catppuccin')).toBe('catppuccin');
	});

	it('falls back to default for unknown or null values', () => {
		expect(resolveThemeId(null)).toBe(DEFAULT_THEME);
		expect(resolveThemeId('unknown')).toBe(DEFAULT_THEME);
		expect(resolveThemeId('')).toBe(DEFAULT_THEME);
	});
});
