import { useEventLists } from '../../store/store.ts';
import * as Styled from './MicroTasksQueue.styled.ts';
import InfoIcon from '../InfoIcon/InfoIcon.tsx';
import InfoModal from '../Modal/Modal.tsx';
import useBoolean from '../../utils/useBoolean.tsx';

function MicroTasksQueue() {
	const tasks = useEventLists((state) => state.microtask_queue);
	const [open, setOpen, setClose] = useBoolean(false);

	return (
		<Styled.MicroTasksQueue>
			<InfoIcon onClick={setOpen} />
			{tasks.map((task) => {
				const serialized = task.serialize();
				const key = serialized + task.node.start;
				return <Styled.MicroTask key={key}>{serialized}</Styled.MicroTask>;
			})}
			<InfoModal isOpen={open} onClose={setClose}>
				<h2>Microtasks</h2>
				<Styled.CloseIcon onClick={setClose} />
				<p>
					A microtask is a short function which is executed after the function
					or program which created it exits and only if the JavaScript execution
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
		</Styled.MicroTasksQueue>
	);
}

export default MicroTasksQueue;
