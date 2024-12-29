import WebApiTask from './WebApiTask.tsx';
import * as Styled from './WebApiQueue.styled.ts';
import InfoIcon from 'components/InfoIcon/InfoIcon.tsx';
import useBoolean from 'utils/hooks/useBoolean.ts';
import { Zoom } from '@mui/material';
import { List } from '../../Home.styled.ts';
import WebApiQueueModal from './WebApiQueue.modal.tsx';
import { useQueueManagerStore } from 'store/store.ts';

function WebApiQueue({ className }: { className?: string }) {
	const tasks = useQueueManagerStore((state) => state.webApi);
	const [isOpened, toggle] = useBoolean(false);

	return (
		<List className={className}>
			<span>Web api</span>
			<Styled.WebApiQueue>
				<InfoIcon onClick={toggle} />
				{tasks.map((task) => (
					<Zoom in key={task.value}>
						<WebApiTask task={task} />
					</Zoom>
				))}
				<WebApiQueueModal isOpened={isOpened} toggle={toggle} />
			</Styled.WebApiQueue>
		</List>
	);
}

export default WebApiQueue;
