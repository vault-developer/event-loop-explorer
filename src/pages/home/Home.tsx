import * as Styled from './Home.styled.ts';

export default function Home() {
	return (
		<Styled.Layout>
			<Styled.WideColumn>
				<Styled.Info />
				<Styled.Configurator />
				<Styled.WebApiQueue />
			</Styled.WideColumn>
			<Styled.NarrowColumn>
				<Styled.CallStack />
				<Styled.Console />
			</Styled.NarrowColumn>
			<Styled.WideColumn>
				<Styled.RequestAnimationFrameQueue />
				<Styled.TasksQueue />
				<Styled.MicroTasksQueue />
				<Styled.EventLoop />
			</Styled.WideColumn>
		</Styled.Layout>
	);
}
