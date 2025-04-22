import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from './page';

describe('Page', () => {
	it('renders without crashing', () => {
		render(<Page />);
		expect(screen.getByText('Event loop explorer')).toBeInTheDocument();
	});

	it('renders all sections', () => {
		render(<Page />);
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
