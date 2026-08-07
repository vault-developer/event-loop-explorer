import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/theme';
import App from './App';

describe('App', () => {
	it('renders without crashing', () => {
		render(
			<ThemeProvider>
				<App />
			</ThemeProvider>
		);
		expect(screen.getByText('Event loop explorer')).toBeInTheDocument();
	});

	it('renders all sections', () => {
		render(
			<ThemeProvider>
				<App />
			</ThemeProvider>
		);
		expect(screen.getByText('Code Editor')).toBeInTheDocument();
		expect(screen.getByText('Web API')).toBeInTheDocument();
		expect(
			screen.getByText('RequestAnimationFrame callbacks')
		).toBeInTheDocument();
		expect(screen.getByText('Callstack')).toBeInTheDocument();
		expect(screen.getByText('Console')).toBeInTheDocument();
		expect(screen.getByText('Tasks Queue')).toBeInTheDocument();
		expect(screen.getByText('Microtasks Queue')).toBeInTheDocument();
		expect(screen.getByText('Event loop')).toBeInTheDocument();
	});
});
