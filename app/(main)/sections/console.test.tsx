import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Console } from './console';

jest.mock('@/store/store', () => ({
	useQueueManagerStore: jest.fn().mockImplementation(() => ['log1', 'log2']),
}));

describe('Console Component', () => {
	beforeEach(() => render(<Console />));

	it('should render the console title', () => {
		const titleElement = screen.getByText(/Console/i);
		expect(titleElement).toBeInTheDocument();
	});

	it('should render logs', () => {
		const log1 = screen.getByText(/log1/i);
		const log2 = screen.getByText(/log2/i);
		expect(log1).toBeInTheDocument();
		expect(log2).toBeInTheDocument();
	});

	it('should not render the modal by default', async () => {
		const descriptionElements = screen.queryAllByText(
			/The browser console is a built-in tool/i
		);
		expect(descriptionElements.length).toBe(0);
	});

	it('should render the modal after icon click', async () => {
		const modalButton = screen.getByRole('button');
		await modalButton.click();
		const descriptionElement = screen.getByText(
			/The browser console is a built-in tool/i
		);
		expect(descriptionElement).toBeInTheDocument();
	});
});
