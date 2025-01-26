import { useQueueManagerStore } from 'store/store.ts';
import * as Styled from './MicroTasksQueue.styled.ts';
import InfoIcon from 'components/InfoIcon/InfoIcon.tsx';
import useBoolean from 'utils/hooks/useBoolean.ts';
import { List } from '../../Home.styled.ts';
import MicroTasksQueueModal from './MicroTasksQueue.modal.tsx';

function MicroTasksQueue({ className }: { className?: string }) {
	const tasks = useQueueManagerStore((state) => state.microtask);
	const [isOpened, toggle] = useBoolean(false);

	return (
		<List className={className}>
			<span>Microtasks Queue</span>
			<Styled.MicroTasksQueue>
				<InfoIcon onClick={toggle} />
				{tasks.map((task) => (
					<Styled.MicroTask key={task}>{task}</Styled.MicroTask>
				))}
				<MicroTasksQueueModal isOpened={isOpened} toggle={toggle} />
			</Styled.MicroTasksQueue>
		</List>
	);
}

export default MicroTasksQueue;
