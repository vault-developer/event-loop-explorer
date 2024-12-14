import * as Styled from './Home.styled.ts';
import { useEventLoopAnimation } from '../../store/store.ts';
import { isMobile } from '../../utils/isMobile.ts';
import { useEffect } from 'react';

export default function Home() {
	const status = useEventLoopAnimation((state) => state.status);

	useEffect(() => {
		if (
			isMobile() &&
			status === 'running' &&
			document.getElementById('eventLoop')
		) {
			document.getElementById('eventLoop')?.scrollIntoView({
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
