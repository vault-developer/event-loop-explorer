import { render } from 'src/test/test-utils';
import '@testing-library/jest-dom';
import Modal from './Modal';

describe('InfoModal', () => {
	it('renders children when open', () => {
		const { getByText } = render(
			<Modal isOpened={true} onClose={() => {}}>
				<div>Test Content</div>
			</Modal>
		);

		expect(getByText('Test Content')).toBeInTheDocument();
	});

	it('does not render children when closed', () => {
		const { queryByText } = render(
			<Modal isOpened={false} onClose={() => {}}>
				<div>Test Content</div>
			</Modal>
		);

		expect(queryByText('Test Content')).not.toBeInTheDocument();
	});
});
