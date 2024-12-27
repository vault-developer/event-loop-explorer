import { useEventLists } from '../../../../store/store.ts';
import * as Styled from './Callstack.styled.ts';
import InfoIcon from '../../../../components/InfoIcon/InfoIcon.tsx';
import useBoolean from '../../../../utils/useBoolean.tsx';
import { Zoom } from '@mui/material';
import { List } from '../../Home.styled.ts';
import CallStackModal from "./Callstack.modal.tsx";

function CallStack({ className }: { className?: string }) {
	const tasks = useEventLists((state) => state.callstack);
	const [isOpened, toggle] = useBoolean(false);

	return (
		<List className={className}>
			<span>CallStack</span>
			<Styled.Callstack>
				<InfoIcon onClick={toggle} />
				{tasks.map(({ display: stack }) => (
					<Zoom in key={stack}>
						<Styled.CallstackElement>{stack}</Styled.CallstackElement>
					</Zoom>
				))}
				<CallStackModal isOpened={isOpened} toggle={toggle} />
			</Styled.Callstack>
		</List>
	);
}

export default CallStack;
