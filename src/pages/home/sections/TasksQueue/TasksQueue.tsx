import { useQueueManagerStore } from 'store/store.ts';
import * as Styled from './TasksQueue.styled.ts';
import InfoIcon from 'components/InfoIcon/InfoIcon.tsx';
import useBoolean from 'utils/hooks/useBoolean.ts';
import { Zoom } from '@mui/material';
import { List } from '../../Home.styled.ts';
import TasksQueueModal from './TasksQueue.modal.tsx';

function TasksQueue({ className }: { className?: string }) {
	const tasks = useQueueManagerStore((state) => state.macrotask);
	const [isOpened, toggle] = useBoolean(false);

	return (
		<List className={className}>
			<span>Tasks Queue</span>
			<Styled.TasksQueue>
				<InfoIcon onClick={toggle} />
				{tasks.map((task) => (
					<Zoom in key={task}>
						<Styled.Task>{task}</Styled.Task>
					</Zoom>
				))}
				<TasksQueueModal isOpened={isOpened} toggle={toggle} />
			</Styled.TasksQueue>
		</List>
	);
}

export default TasksQueue;
