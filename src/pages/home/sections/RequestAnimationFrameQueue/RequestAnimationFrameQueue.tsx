import * as Styled from './RequestAnimationFrameQueue.styled.ts';
import useBoolean from 'utils/hooks/useBoolean.ts';
import { List } from '../../Home.styled.ts';
import RequestAnimationFrameQueueModal from './RequestAnimationFrameQueue.modal.tsx';
import { useQueueManagerStore } from 'store/store.ts';
import { Icon } from 'components/Icon/Icon.tsx';
import { useTheme } from '@emotion/react';

function RequestAnimationFrameQueue({ className }: { className?: string }) {
	const callbacks = useQueueManagerStore((state) => state.rafCallback);
	const [isOpened, toggle] = useBoolean(false);
	const theme = useTheme();

	return (
		<List className={className}>
			<span>RequestAnimationFrame callbacks</span>
			<Styled.CallbacksQueue>
				<Styled.InfoButton onClick={toggle}>
					<Icon variant={'info'} color={theme.custom.com.icon.background} />
				</Styled.InfoButton>
				{callbacks.map((callback) => (
					<Styled.Callback key={callback}>{callback}</Styled.Callback>
				))}
				<RequestAnimationFrameQueueModal isOpened={isOpened} toggle={toggle} />
			</Styled.CallbacksQueue>
		</List>
	);
}

export default RequestAnimationFrameQueue;
