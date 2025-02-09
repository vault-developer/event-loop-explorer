import { useQueueManagerStore } from 'store/store.ts';
import * as Styled from './MicroTasksQueue.styled.ts';
import useBoolean from 'utils/hooks/useBoolean.ts';
import { List } from '../../Home.styled.ts';
import MicroTasksQueueModal from './MicroTasksQueue.modal.tsx';
import { Icon } from 'components/Icon/Icon.tsx';
import { useTheme } from '@emotion/react';

function MicroTasksQueue({ className }: { className?: string }) {
	const tasks = useQueueManagerStore((state) => state.microtask);
	const [isOpened, toggle] = useBoolean(false);
	const theme = useTheme();

	return (
		<List className={className}>
			<span>Microtasks Queue</span>
			<Styled.MicroTasksQueue>
				<Styled.InfoButton onClick={toggle}>
					<Icon variant={'info'} color={theme.custom.com.icon.background} />
				</Styled.InfoButton>
				{tasks.map((task) => (
					<Styled.MicroTask key={task}>{task}</Styled.MicroTask>
				))}
				<MicroTasksQueueModal isOpened={isOpened} toggle={toggle} />
			</Styled.MicroTasksQueue>
		</List>
	);
}

export default MicroTasksQueue;
