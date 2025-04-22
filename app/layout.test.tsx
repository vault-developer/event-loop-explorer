import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './layout';

describe('Layout', () => {
	it('renders without crashing', () => {
		render(
			<Layout>
				<div>Test Content</div>
			</Layout>
		);
		expect(screen.getByText('Test Content')).toBeInTheDocument();
	});
});
