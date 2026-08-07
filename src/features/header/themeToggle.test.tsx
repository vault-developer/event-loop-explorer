import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi, type Mock } from 'vitest';
import { ThemeToggle } from './themeToggle';
import { useTheme } from '@/theme';

vi.mock('@/theme', () => ({
	useTheme: vi.fn(),
}));

afterEach(cleanup);

describe('ThemeToggle', () => {
	it('should render Sun and Moon icons', () => {
		(useTheme as Mock).mockReturnValue({
			theme: 'dark',
			setTheme: vi.fn(),
		});
		render(<ThemeToggle />);

		const moonIcon = screen.getByTestId('moon-icon');
		const sunIcon = screen.getByTestId('sun-icon');
		expect(moonIcon).toBeInTheDocument();
		expect(sunIcon).toBeInTheDocument();
	});

	it('should toggle light theme on button click', () => {
		const setThemeMock = vi.fn();
		(useTheme as Mock).mockReturnValue({
			theme: 'light',
			setTheme: setThemeMock,
		});
		render(<ThemeToggle />);
		const toggleButton = screen.getByRole('button', { name: 'Toggle theme' });
		fireEvent.click(toggleButton);
		expect(setThemeMock).toHaveBeenCalledWith('dark');
	});

	it('should toggle dark theme on button click', () => {
		const setThemeMock = vi.fn();
		(useTheme as Mock).mockReturnValue({
			theme: 'dark',
			setTheme: setThemeMock,
		});
		render(<ThemeToggle />);
		const toggleButton = screen.getByRole('button', { name: 'Toggle theme' });
		fireEvent.click(toggleButton);
		expect(setThemeMock).toHaveBeenCalledWith('light');
	});
});
