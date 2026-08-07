import React from 'react';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TasksQueue } from '@/features/sections/tasksQueue';

vi.mock('@/store/store', () => ({
	useQueueManagerStore: vi.fn().mockImplementation(() => ['task1', 'task2']),
}));

describe('Tasks Queue Component', () => {
	beforeEach(() => render(<TasksQueue />));

	it('should render the task title', () => {
		const titleElement = screen.getByText(/Tasks Queue/i);
		expect(titleElement).toBeInTheDocument();
	});

	it('should render logs', () => {
		const task1 = screen.getByText(/task1/i);
		const task2 = screen.getByText(/task2/i);
		expect(task1).toBeInTheDocument();
		expect(task2).toBeInTheDocument();
	});

	it('should not render the modal by default', async () => {
		const descriptionElements = screen.queryAllByText(
			/A task is anything which is scheduled to be run/i
		);
		expect(descriptionElements.length).toBe(0);
	});

	it('should render the modal after icon click', async () => {
		const modalButton = screen.getByRole('button');
		await modalButton.click();
		const descriptionElement = screen.getByText(
			/A task is anything which is scheduled to be run/i
		);
		expect(descriptionElement).toBeInTheDocument();
	});
});
