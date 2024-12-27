import { useEventLists } from '../../../../store/store.ts';
import * as Styled from './MicroTasksQueue.styled.ts';
import InfoIcon from '../../../../components/InfoIcon/InfoIcon.tsx';
import useBoolean from '../../../../utils/useBoolean.tsx';
import { Zoom } from '@mui/material';
import { List } from '../../Home.styled.ts';
import MicroTasksQueueModal from './MicroTasksQueue.modal.tsx';

function MicroTasksQueue({ className }: { className?: string }) {
	const tasks = useEventLists((state) => state.microtask_queue);
	const [open, toggle] = useBoolean(false);

	return (
		<List className={className}>
			<span>Microtasks Queue</span>
			<Styled.MicroTasksQueue>
				<InfoIcon onClick={toggle} />
				{tasks.map((task) => {
					const serialized = task.serialize();
					const key = serialized + task.node.start;
					return (
						<Zoom in key={key}>
							<Styled.MicroTask>{serialized}</Styled.MicroTask>
						</Zoom>
					);
				})}
				<MicroTasksQueueModal open={open} toggle={toggle} />
			</Styled.MicroTasksQueue>
		</List>
	);
}

export default MicroTasksQueue;
