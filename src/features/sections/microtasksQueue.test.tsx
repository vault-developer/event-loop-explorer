import React from 'react';
import { vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MicrotasksQueue } from '@/features/sections/microtasksQueue';

vi.mock('@/store/store', () => ({
	useQueueManagerStore: vi.fn().mockImplementation(() => ['ms1', 'ms2']),
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

	it('should not render the modal by default', () => {
		const descriptionElements = screen.queryAllByText(
			/A microtask is a short function which is executed/i
		);
		expect(descriptionElements.length).toBe(0);
	});

	it('should render the modal after icon click', () => {
		const modalButton = screen.getByRole('button');
		fireEvent.click(modalButton);
		const descriptionElement = screen.getByText(
			/A microtask is a short function which is executed/i
		);
		expect(descriptionElement).toBeInTheDocument();
	});
});
