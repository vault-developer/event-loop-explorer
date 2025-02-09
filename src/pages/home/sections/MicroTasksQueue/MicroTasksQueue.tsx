import { useQueueManagerStore } from 'store/store.ts';
import * as Styled from './MicroTasksQueue.styled.ts';
import useBoolean from 'utils/hooks/useBoolean.ts';
import MicroTasksQueueModal from './MicroTasksQueue.modal.tsx';
import { Icon } from 'components/Icon/Icon.tsx';
import { useTheme } from '@emotion/react';
import { BaseSection } from '../BaseSection/BaseSection.tsx';

function MicroTasksQueue({ className }: { className?: string }) {
	const tasks = useQueueManagerStore((state) => state.microtask);
	const [isOpened, toggle] = useBoolean(false);
	const theme = useTheme();

	return (
		<BaseSection className={className} title={'Microtasks Queue'}>
			<Styled.MicroTasksQueue>
				<Styled.InfoButton onClick={toggle}>
					<Icon variant={'info'} color={theme.custom.com.icon.background} />
				</Styled.InfoButton>
				{tasks.map((task) => (
					<Styled.MicroTask key={task}>{task}</Styled.MicroTask>
				))}
				<MicroTasksQueueModal isOpened={isOpened} toggle={toggle} />
			</Styled.MicroTasksQueue>
		</BaseSection>
	);
}

export default MicroTasksQueue;
