import React from 'react';
import { vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { RequestAnimationFrame } from '@/features/sections/requestAnimationFrame';

vi.mock('@/store/store', () => ({
	useQueueManagerStore: vi.fn().mockImplementation(() => ['raf1', 'raf2']),
}));

describe('RequestAnimationFrame Callbacks Component', () => {
	beforeEach(() => render(<RequestAnimationFrame />));

	it('should render the requestAnimationFrame title', () => {
		const titleElement = screen.getByText(/RequestAnimationFrame callbacks/i);
		expect(titleElement).toBeInTheDocument();
	});

	it('should render elements', () => {
		const raf1 = screen.getByText(/raf1/i);
		const raf2 = screen.getByText(/raf2/i);
		expect(raf1).toBeInTheDocument();
		expect(raf2).toBeInTheDocument();
	});

	it('should not render the modal by default', () => {
		const descriptionElements = screen.queryAllByText(
			/The window.requestAnimationFrame\(\) method tells the browser/i
		);
		expect(descriptionElements.length).toBe(0);
	});

	it('should render the modal after icon click', () => {
		const modalButton = screen.getByRole('button');
		fireEvent.click(modalButton);
		const descriptionElement = screen.getByText(
			/The window.requestAnimationFrame\(\) method tells the browser/i
		);
		expect(descriptionElement).toBeInTheDocument();
	});
});
