import { useEventLists } from '../../../../store/store.ts';
import * as Styled from './TasksQueue.styled.ts';
import InfoIcon from '../../../../components/InfoIcon/InfoIcon.tsx';
import useBoolean from '../../../../utils/useBoolean.tsx';
import { Zoom } from '@mui/material';
import { List } from '../../Home.styled.ts';
import TasksQueueModal from "./TasksQueue.modal.tsx";

function TasksQueue({ className }: { className?: string }) {
	const tasks = useEventLists((state) => state.task_queue);
	const [open, toggle] = useBoolean(false);

	return (
		<List className={className}>
			<span>Tasks Queue</span>
			<Styled.TasksQueue>
				<InfoIcon onClick={toggle} />
				{tasks.map((task) => {
					const serialized = task.serialize();
					const key = serialized + task.node.start;
					return (
						<Zoom in key={key}>
							<Styled.Task>{serialized}</Styled.Task>
						</Zoom>
					);
				})}
				<TasksQueueModal open={open} toggle={toggle} />
			</Styled.TasksQueue>
		</List>
	);
}

export default TasksQueue;
