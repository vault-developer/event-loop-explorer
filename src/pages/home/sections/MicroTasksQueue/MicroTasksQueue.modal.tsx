import * as Styled from './MicroTasksQueue.styled.ts';
import InfoModal from 'components/Modal/Modal.tsx';

function MicroTasksQueueModal({
	isOpened,
	toggle,
}: {
	isOpened: boolean;
	toggle: () => void;
}) {
	return (
		<InfoModal isOpened={isOpened} onClose={toggle}>
			<h2>Microtasks</h2>
			<Styled.CloseIcon onClick={toggle} />
			<p>
				A microtask is a short function which is executed after the function or
				program which created it exits and only if the JavaScript execution
				stack is empty, but before returning control to the event loop being
				used by the user agent to drive the script's execution environment.
			</p>
			<p style={{ marginTop: 12 }}>Events that can trigger new microtasks:</p>
			<ul style={{ marginTop: 8 }}>
				<li>Promise resolution (.then(), .catch(), .finally())</li>
				<li>Occurrence of observed DOM changes</li>
				<li>queueMicrotask() method</li>
			</ul>
		</InfoModal>
	);
}

export default MicroTasksQueueModal;
