import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import {
	afterEach,
	beforeAll,
	describe,
	expect,
	it,
	vi,
	type Mock,
} from 'vitest';
import { ThemeToggle } from './themeToggle';
import { useTheme, THEMES } from '@/theme';

vi.mock('@/theme', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@/theme')>();
	return {
		...actual,
		useTheme: vi.fn(),
	};
});

beforeAll(() => {
	Element.prototype.scrollIntoView = vi.fn();
	HTMLElement.prototype.hasPointerCapture = vi.fn();
	HTMLElement.prototype.releasePointerCapture = vi.fn();
	HTMLElement.prototype.setPointerCapture = vi.fn();
});

afterEach(cleanup);

describe('ThemeToggle', () => {
	it('should render the current theme label', () => {
		(useTheme as Mock).mockReturnValue({
			theme: 'midnight',
			setTheme: vi.fn(),
			themeDefinition: THEMES.midnight,
		});
		render(<ThemeToggle />);

		expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
		expect(screen.getByLabelText('Select theme')).toBeInTheDocument();
		expect(screen.getByText('Midnight')).toBeInTheDocument();
	});

	it('should list theme presets and call setTheme on select', async () => {
		const setThemeMock = vi.fn();
		(useTheme as Mock).mockReturnValue({
			theme: 'midnight',
			setTheme: setThemeMock,
			themeDefinition: THEMES.midnight,
		});
		render(<ThemeToggle />);

		const trigger = screen.getByLabelText('Select theme');
		fireEvent.pointerDown(trigger);
		fireEvent.keyDown(trigger, { key: 'Enter' });

		const nordOption = await screen.findByRole('option', { name: /Nord/i });
		fireEvent.click(nordOption);

		expect(setThemeMock).toHaveBeenCalledWith('nord');
	});
});
