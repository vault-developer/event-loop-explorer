import * as Styled from './Home.styled.ts';
import { useEventLoopAnimation } from '../../store/store.ts';
import { isMobile } from '../../utils/isMobile.ts';
import { useEffect } from 'react';
import { EVENT_LOOP_ID } from '../../constants.ts';

export default function Home() {
	const status = useEventLoopAnimation((state) => state.status);

	useEffect(() => {
		const eventLoopTitleDomNode = document.getElementById(EVENT_LOOP_ID);
		if (isMobile() && status === 'running' && eventLoopTitleDomNode) {
			eventLoopTitleDomNode.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	}, [status]);

	return (
		<Styled.Layout>
			<Styled.Info />
			<Styled.Configurator />
			<Styled.WebApiQueue />
			<Styled.RequestAnimationFrameQueue />
			<Styled.CallStack />
			<Styled.Console />
			<Styled.TasksQueue />
			<Styled.MicroTasksQueue />
			<Styled.EventLoop />
		</Styled.Layout>
	);
}
