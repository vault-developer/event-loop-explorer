import { useQueueManagerStore } from 'store/store.ts';
import * as Styled from './TasksQueue.styled.ts';
import useBoolean from 'utils/hooks/useBoolean.ts';
import { List } from '../../Home.styled.ts';
import TasksQueueModal from './TasksQueue.modal.tsx';
import { Icon } from 'components/Icon/Icon.tsx';
import { useTheme } from '@emotion/react';

function TasksQueue({ className }: { className?: string }) {
	const tasks = useQueueManagerStore((state) => state.macrotask);
	const [isOpened, toggle] = useBoolean(false);
	const theme = useTheme();

	return (
		<List className={className}>
			<span>Tasks Queue</span>
			<Styled.TasksQueue>
				<Styled.CloseButton onClick={toggle}>
					<Icon variant={'info'} color={theme.custom.com.icon.background} />
				</Styled.CloseButton>
				{tasks.map((task) => (
					<Styled.Task key={task}>{task}</Styled.Task>
				))}
				<TasksQueueModal isOpened={isOpened} toggle={toggle} />
			</Styled.TasksQueue>
		</List>
	);
}

export default TasksQueue;
