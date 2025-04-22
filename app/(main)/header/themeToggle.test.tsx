import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { ThemeToggle } from './themeToggle';
import { useTheme } from 'next-themes';

jest.mock('next-themes', () => ({
	useTheme: jest.fn(),
}));

afterEach(cleanup);

describe('ThemeToggle', () => {
	it('should render Sun and Moon icons', () => {
		(useTheme as jest.Mock).mockReturnValue({
			theme: 'dark',
			setTheme: jest.fn(),
		});
		render(<ThemeToggle />);

		const moonIcon = screen.getByTestId('moon-icon');
		const sunIcon = screen.getByTestId('sun-icon');
		expect(moonIcon).toBeInTheDocument();
		expect(sunIcon).toBeInTheDocument();
	});

	it('should toggle light theme on button click', () => {
		const setThemeMock = jest.fn();
		(useTheme as jest.Mock).mockReturnValue({
			theme: 'light',
			setTheme: setThemeMock,
		});
		render(<ThemeToggle />);
		const toggleButton = screen.getByRole('button', { name: 'Toggle theme' });
		fireEvent.click(toggleButton);
		expect(setThemeMock).toHaveBeenCalledWith('dark');
	});

	it('should toggle dark theme on button click', () => {
		const setThemeMock = jest.fn();
		(useTheme as jest.Mock).mockReturnValue({
			theme: 'dark',
			setTheme: setThemeMock,
		});
		render(<ThemeToggle />);
		const toggleButton = screen.getByRole('button', { name: 'Toggle theme' });
		fireEvent.click(toggleButton);
		expect(setThemeMock).toHaveBeenCalledWith('light');
	});
});
