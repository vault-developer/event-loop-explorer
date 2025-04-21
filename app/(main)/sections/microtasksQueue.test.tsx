import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MicrotasksQueue } from '@/app/(main)/sections/microtasksQueue';

jest.mock('@/store/store', () => ({
	useQueueManagerStore: jest.fn().mockImplementation(() => ['ms1', 'ms2']),
}));

describe('Microtasks Queue Component', () => {
	beforeEach(() => render(<MicrotasksQueue />));

	it('should render the microtask title', () => {
		const titleElement = screen.getByText(/Microtasks Queue/i);
		expect(titleElement).toBeInTheDocument();
	});

	it('should render logs', () => {
		const ms1 = screen.getByText(/ms1/i);
		const ms2 = screen.getByText(/ms2/i);
		expect(ms1).toBeInTheDocument();
		expect(ms2).toBeInTheDocument();
	});

	it('should not render the modal by default', async () => {
		const descriptionElements = screen.queryAllByText(
			/A microtask is a short function which is executed/i
		);
		expect(descriptionElements.length).toBe(0);
	});

	it('should render the modal after icon click', async () => {
		const modalButton = screen.getByRole('button');
		await modalButton.click();
		const descriptionElement = screen.getByText(
			/A microtask is a short function which is executed/i
		);
		expect(descriptionElement).toBeInTheDocument();
	});
});
