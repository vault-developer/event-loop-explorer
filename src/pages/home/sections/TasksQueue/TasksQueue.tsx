import { useQueueManagerStore } from 'store/store.ts';
import * as Styled from './TasksQueue.styled.ts';
import useBoolean from 'utils/hooks/useBoolean.ts';
import TasksQueueModal from './TasksQueue.modal.tsx';
import { Icon } from 'components/Icon/Icon.tsx';
import { useTheme } from '@emotion/react';
import { BaseSection } from '../BaseSection/BaseSection.tsx';

function TasksQueue({ className }: { className?: string }) {
	const tasks = useQueueManagerStore((state) => state.macrotask);
	const [isOpened, toggle] = useBoolean(false);
	const theme = useTheme();

	return (
		<BaseSection className={className} title={'Tasks Queue'}>
			<Styled.TasksQueue>
				<Styled.InfoButton onClick={toggle}>
					<Icon variant={'info'} color={theme.custom.com.icon.background} />
				</Styled.InfoButton>
				{tasks.map((task) => (
					<Styled.Task key={task}>{task}</Styled.Task>
				))}
				<TasksQueueModal isOpened={isOpened} toggle={toggle} />
			</Styled.TasksQueue>
		</BaseSection>
	);
}

export default TasksQueue;
