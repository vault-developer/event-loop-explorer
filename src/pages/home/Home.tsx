import * as Styled from './Home.styled.ts';

export default function Home() {
	return (
		<Styled.Layout>
			<Styled.FatColumn>
				<Styled.Info />
				<Styled.Configurator />
				<Styled.WebApiQueue />
			</Styled.FatColumn>
			<Styled.ThinColumn>
				<Styled.CallStack />
				<Styled.Console />
			</Styled.ThinColumn>
			<Styled.FatColumn>
				<Styled.RequestAnimationFrameQueue />
				<Styled.TasksQueue />
				<Styled.MicroTasksQueue />
				<Styled.EventLoop />
			</Styled.FatColumn>
		</Styled.Layout>
	);
}
