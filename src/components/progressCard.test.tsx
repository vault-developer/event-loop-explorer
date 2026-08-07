import React from 'react';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressCard } from './progressCard';

vi.mock('@/store/store', () => ({
	useTimeStore: {
		getState: vi.fn().mockReturnValue({ time: 1000 }),
	},
}));

describe('ProgressCard Component', () => {
	it('should render the component with title', () => {
		render(<ProgressCard text="Test Title" start={0} end={1000} />);
		expect(screen.getByText('Test Title')).toBeInTheDocument();
	});
});
