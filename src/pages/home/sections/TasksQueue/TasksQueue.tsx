import { useQueueManagerStore } from 'store/store.ts';
import * as Styled from './TasksQueue.styled.ts';
import { BaseModalSection } from '../BaseModalSection/BaseModalSection.tsx';
import { BaseQueueElement } from '../BaseQueueElement/BaseQueueElement.tsx';

const ModalContent = (
	<>
		<h2>Tasks</h2>
		<p>
			A task is anything which is scheduled to be run by the standard mechanisms
			such as initially starting to run a program, an event being dispatched
			asynchronously, or an interval or timeout being fired. These all get
			scheduled on the task queue.
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
	</>
);

function TasksQueue({ className }: { className?: string }) {
	const tasks = useQueueManagerStore((state) => state.macrotask);

	return (
		<BaseModalSection
			className={className}
			title={'Tasks Queue'}
			modalContent={ModalContent}
		>
			<Styled.TasksQueue>
				{tasks.map((task) => (
					<BaseQueueElement key={task}>{task}</BaseQueueElement>
				))}
			</Styled.TasksQueue>
		</BaseModalSection>
	);
}

export default TasksQueue;
