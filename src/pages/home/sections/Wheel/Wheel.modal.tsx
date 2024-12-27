import * as Styled from './Wheel.styled.ts';
import InfoModal from 'components/Modal/Modal.tsx';

function WheelModal({
	isOpened,
	toggle,
}: {
	isOpened: boolean;
	toggle: () => void;
}) {
	return (
		<InfoModal isOpened={isOpened} onClose={toggle}>
			<h2>Event Loop</h2>
			<Styled.CloseIcon onClick={toggle} />
			<p style={{ marginBottom: 8 }}>
				The event loop is a fundamental concept in browser that manages the
				execution of code, handling of events, and updating of the user
				interface.
			</p>
			<p style={{ marginTop: 12 }}>
				The event loop continuously checks for and processes events and queued
				tasks in a specific order:
			</p>
			<ol style={{ marginTop: 8 }}>
				<li>Execute all synchronous code in the call stack</li>
				<li>
					Check the microtask queue (e.g., Promise callbacks) and execute all
					tasks.
				</li>
				<li>
					Check the macrotask queue (e.g., setTimeout, DOM events) and execute
					one task.
				</li>
				<li>Update the rendering if necessary.</li>
				<li>Repeat the process.</li>
			</ol>
		</InfoModal>
	);
}

export default WheelModal;
