import * as Styled from './Callstack.styled.ts';
import useBoolean from 'utils/hooks/useBoolean.ts';
import { List } from '../../Home.styled.ts';
import CallStackModal from './Callstack.modal.tsx';
import { useQueueManagerStore } from 'store/store.ts';
import { Icon } from 'components/Icon/Icon.tsx';
import { useTheme } from '@emotion/react';

function CallStack({ className }: { className?: string }) {
	const tasks = useQueueManagerStore((state) => state.callstack);
	const [isOpened, toggle] = useBoolean(false);
	const theme = useTheme();

	return (
		<List className={className}>
			<span>CallStack</span>
			<Styled.Callstack>
				<Styled.InfoButton onClick={toggle}>
					<Icon variant={'info'} color={theme.custom.com.icon.background} />
				</Styled.InfoButton>
				{tasks.map((task) => (
					<Styled.CallstackElement key={task}>{task}</Styled.CallstackElement>
				))}
				<CallStackModal isOpened={isOpened} toggle={toggle} />
			</Styled.Callstack>
		</List>
	);
}

export default CallStack;
