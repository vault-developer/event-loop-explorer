import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from './header';

describe('Header Component', () => {
	beforeEach(() => render(<Header />));

	it('should render the header title', () => {
		const titleElement = screen.getByText(/Event loop explorer/i);
		expect(titleElement).toBeInTheDocument();
	});

	it('should render the GitHub link', () => {
		const githubLink = screen.getByRole('link');
		expect(githubLink).toBeInTheDocument();
		expect(githubLink).toHaveAttribute(
			'href',
			'https://github.com/vault-developer/event-loop-explorer'
		);
	});

	it('should render the ThemeToggle component', () => {
		const themeToggle = screen.getByTestId('theme-toggle');
		expect(themeToggle).toBeInTheDocument();
	});
});
