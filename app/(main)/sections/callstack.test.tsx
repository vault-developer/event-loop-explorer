import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Callstack } from '@/app/(main)/sections/callstack';

jest.mock('@/store/store', () => ({
	useQueueManagerStore: jest
		.fn()
		.mockImplementation(() => ['stack-1', 'stack-2']),
}));

describe('Callstack Component', () => {
	beforeEach(() => render(<Callstack />));

	it('should render the callstack title', () => {
		const titleElement = screen.getByText(/Callstack/i);
		expect(titleElement).toBeInTheDocument();
	});

	it('should render callstacks', () => {
		const callstack1 = screen.getByText(/stack-1/i);
		const callstack2 = screen.getByText(/stack-2/i);
		expect(callstack1).toBeInTheDocument();
		expect(callstack2).toBeInTheDocument();
	});

	it('should not render the modal by default', async () => {
		const descriptionElements = screen.queryAllByText(
			/A call stack is a mechanism for an interpreter to keep track of its place/i
		);
		expect(descriptionElements.length).toBe(0);
	});

	it('should render the modal after icon click', async () => {
		const modalButton = screen.getByRole('button');
		await modalButton.click();
		const descriptionElement = screen.getByText(
			/A call stack is a mechanism for an interpreter to keep track of its place/i
		);
		expect(descriptionElement).toBeInTheDocument();
	});
});
