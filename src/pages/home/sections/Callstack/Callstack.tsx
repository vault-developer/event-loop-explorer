import * as Styled from './Callstack.styled.ts';
import InfoIcon from 'components/InfoIcon/InfoIcon.tsx';
import useBoolean from 'utils/hooks/useBoolean.ts';
import { List } from '../../Home.styled.ts';
import CallStackModal from './Callstack.modal.tsx';
import { useQueueManagerStore } from 'store/store.ts';

function CallStack({ className }: { className?: string }) {
	const tasks = useQueueManagerStore((state) => state.callstack);
	const [isOpened, toggle] = useBoolean(false);

	return (
		<List className={className}>
			<span>CallStack</span>
			<Styled.Callstack>
				<InfoIcon onClick={toggle} />
				{tasks.map((task) => (
					<Styled.CallstackElement key={task}>{task}</Styled.CallstackElement>
				))}
				<CallStackModal isOpened={isOpened} toggle={toggle} />
			</Styled.Callstack>
		</List>
	);
}

export default CallStack;
