import { useEventLists } from '../../../../store/store.ts';
import * as Styled from './RequestAnimationFrameQueue.styled.ts';
import InfoIcon from '../../../../components/InfoIcon/InfoIcon.tsx';
import useBoolean from '../../../../utils/useBoolean.tsx';
import { Zoom } from '@mui/material';
import { List } from '../../Home.styled.ts';
import RequestAnimationFrameQueueModal from './RequestAnimationFrameQueue.modal.tsx';

function RequestAnimationFrameQueue({ className }: { className?: string }) {
	const callbacks = useEventLists((state) => state.render_callbacks);
	const [isOpened, toggle] = useBoolean(false);

	return (
		<List className={className}>
			<span>RequestAnimationFrame callbacks</span>
			<Styled.CallbacksQueue>
				<InfoIcon onClick={toggle} />
				{callbacks.map((callback) => {
					const serialized = callback.serialize();
					const key = serialized + callback.node.start;
					return (
						<Zoom in key={key}>
							<Styled.Callback>{serialized}</Styled.Callback>
						</Zoom>
					);
				})}
				<RequestAnimationFrameQueueModal isOpened={isOpened} toggle={toggle} />
			</Styled.CallbacksQueue>
		</List>
	);
}

export default RequestAnimationFrameQueue;
