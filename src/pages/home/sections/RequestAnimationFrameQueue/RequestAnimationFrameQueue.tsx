import * as Styled from './RequestAnimationFrameQueue.styled.ts';
import InfoIcon from 'components/InfoIcon/InfoIcon.tsx';
import useBoolean from 'utils/hooks/useBoolean.ts';
import { List } from '../../Home.styled.ts';
import RequestAnimationFrameQueueModal from './RequestAnimationFrameQueue.modal.tsx';
import { useQueueManagerStore } from 'store/store.ts';

function RequestAnimationFrameQueue({ className }: { className?: string }) {
	const callbacks = useQueueManagerStore((state) => state.rafCallback);
	const [isOpened, toggle] = useBoolean(false);

	return (
		<List className={className}>
			<span>RequestAnimationFrame callbacks</span>
			<Styled.CallbacksQueue>
				<InfoIcon onClick={toggle} />
				{callbacks.map((callback) => (
					<Styled.Callback key={callback}>{callback}</Styled.Callback>
				))}
				<RequestAnimationFrameQueueModal isOpened={isOpened} toggle={toggle} />
			</Styled.CallbacksQueue>
		</List>
	);
}

export default RequestAnimationFrameQueue;
