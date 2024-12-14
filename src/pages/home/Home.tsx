import * as Styled from './Home.styled.ts';

export default function Home() {
	return (
		<Styled.Layout>
			<Styled.Info />
			<Styled.Editor />
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
