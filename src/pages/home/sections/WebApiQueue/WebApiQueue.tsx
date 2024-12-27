import { useEventLists } from '../../../../store/store.ts';
import WebApiTask from './WebApiTask.tsx';
import * as Styled from './WebApiQueue.styled.ts';
import InfoIcon from '../../../../components/InfoIcon/InfoIcon.tsx';
import useBoolean from '../../../../utils/useBoolean.tsx';
import { Zoom } from '@mui/material';
import { List } from '../../Home.styled.ts';
import WebApiQueueModal from './WebApiQueue.modal.tsx';

function WebApiQueue({ className }: { className?: string }) {
	const tasks = useEventLists((state) => state.web_api);
	const [isOpened, toggle] = useBoolean(false);

	return (
		<List className={className}>
			<span>Web api</span>
			<Styled.WebApiQueue>
				<InfoIcon onClick={toggle} />
				{tasks.map((task) => (
					<Zoom in key={task.serialize() + task.node.start}>
						<WebApiTask task={task} />
					</Zoom>
				))}
				<WebApiQueueModal isOpened={isOpened} toggle={toggle} />
			</Styled.WebApiQueue>
		</List>
	);
}

export default WebApiQueue;
