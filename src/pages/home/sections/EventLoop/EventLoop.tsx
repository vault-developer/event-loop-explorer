import * as Styled from './EventLoop.styled.ts';
import useBoolean from 'utils/hooks/useBoolean.ts';
import { BaseLayoutElement } from 'pages/home/Home.styled.ts';
import { EVENT_LOOP_ID } from 'utils/constants.ts';
import EventLoopModal from './EventLoop.modal.tsx';
import Wheel from 'pages/home/sections/EventLoop/Wheel/Wheel.tsx';
import { Icon } from 'components/Icon/Icon.tsx';
import { useTheme } from '@emotion/react';

function EventLoop({ className }: { className?: string }) {
	const [isOpened, toggle] = useBoolean(false);
	const theme = useTheme();

	return (
		<BaseLayoutElement className={className}>
			<p id={EVENT_LOOP_ID}>Event Loop</p>
			<Styled.EventLoopBody>
				<Styled.InfoButton onClick={toggle}>
					<Icon variant={'info'} color={theme.custom.com.icon.background} />
				</Styled.InfoButton>
				<Wheel />
				<EventLoopModal isOpened={isOpened} toggle={toggle} />
			</Styled.EventLoopBody>
		</BaseLayoutElement>
	);
}

export default EventLoop;
