import * as Styled from './EventLoop.styled.ts';
import InfoIcon from 'components/InfoIcon/InfoIcon.tsx';
import useBoolean from 'utils/hooks/useBoolean.ts';
import { BaseLayoutElement } from 'pages/home/Home.styled.ts';
import { EVENT_LOOP_ID } from 'utils/constants.ts';
import EventLoopModal from './EventLoop.modal.tsx';
import Wheel from 'pages/home/sections/EventLoop/Wheel/Wheel.tsx';

function EventLoop({ className }: { className?: string }) {
	const [isOpened, toggle] = useBoolean(false);

	return (
		<BaseLayoutElement className={className}>
			<p id={EVENT_LOOP_ID}>Event Loop</p>
			<Styled.EventLoopBody>
				<InfoIcon onClick={toggle} />
				<Wheel />
				<EventLoopModal isOpened={isOpened} toggle={toggle} />
			</Styled.EventLoopBody>
		</BaseLayoutElement>
	);
}

export default EventLoop;
