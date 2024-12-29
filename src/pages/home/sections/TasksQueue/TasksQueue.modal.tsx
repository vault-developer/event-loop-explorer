import * as Styled from './TasksQueue.styled.ts';
import InfoModal from 'components/Modal/Modal.tsx';

function TasksQueueModal({
	isOpened,
	toggle,
}: {
	isOpened: boolean;
	toggle: () => void;
}) {
	return (
		<InfoModal isOpened={isOpened} onClose={toggle}>
			<h2>Tasks</h2>
			<Styled.CloseIcon onClick={toggle} />
			<p>
				A task is anything which is scheduled to be run by the standard
				mechanisms such as initially starting to run a program, an event being
				dispatched asynchronously, or an interval or timeout being fired. These
				all get scheduled on the task queue.
			</p>
			<p style={{ marginTop: 12 }}>
				For example, tasks get added to the task queue when:
			</p>
			<ul style={{ marginTop: 8 }}>
				<li>
					A new JavaScript program or subprogram is executed (such as from a
					console, or by running the code in a {'<script>'} element) directly.
				</li>
				<li>
					The user clicks an element. A task is then created and executes all
					event callbacks.
				</li>
				<li>
					A timeout or interval created with setTimeout() or setInterval() is
					reached, causing the corresponding callback to be added to the task
					queue.
				</li>
			</ul>
		</InfoModal>
	);
}

export default TasksQueueModal;
