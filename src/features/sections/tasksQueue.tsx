import { FC } from 'react';
import { InfoContainer } from '@/components/infoContainer';
import { Card } from '@/components/card';
import { List } from '@/components/list';
import { useQueueManagerStore } from '@/store/store';

const description = (
	<>
		<p>
			A task is anything which is scheduled to be run by the standard mechanisms
			such as initially starting to run a program, an event being dispatched
			asynchronously, or an interval or timeout being fired. These all get
			scheduled on the task queue.
		</p>
		<p>For example, tasks get added to the task queue when:</p>
		<ul>
			<li>
				- a new JavaScript program or subprogram is executed (such as from a
				console, or by running the code in a {'<script>'} element) directly.
			</li>
			<li>
				- the user clicks an element. A task is then created and executes all
				event callbacks.
			</li>
			<li>
				- a timeout or interval created with setTimeout() or setInterval() is
				reached, causing the corresponding callback to be added to the task
				queue.
			</li>
		</ul>
	</>
);

export const TasksQueue: FC = () => {
	const tasks = useQueueManagerStore((state) => state.macrotask);

	return (
		<InfoContainer title="Tasks Queue" description={description}>
			<List data={tasks} orientation="horizontal">
				{(el) => <Card text={el as (typeof tasks)[0]} />}
			</List>
		</InfoContainer>
	);
};
