import * as Styled from './App.styled.ts';
import CallStack from './components/Callstack/Callstack.tsx';
import Console from './components/Console/Console.tsx';
import Editor from './components/Editor/Editor.tsx';
import EventLoop from './components/EventLoop/EventLoop.tsx';
import MicroTasksQueue from './components/MicroTasksQueue/MicroTasksQueue.tsx';
import RequestAnimationFrameQueue from './components/RenderCallbacksQueue/RequestAnimationFrameQueue.tsx';
import TasksQueue from './components/TasksQueue/TasksQueue.tsx';
import WebApiQueue from './components/WebApiQueue/WebApiQueue.tsx';
import WelcomeModal from './components/WelcomeModal/WelcomeModal.tsx';
import StylesProvider from './providers/StylesProvider.tsx';

function App() {
	const isModalShown = localStorage.getItem('modalShown');
	return (
		<StylesProvider>
			<Styled.Layout>
				<Styled.Info>
					<h2>Event Loop Explorer</h2>
					<p>
						If you enjoy this project, please ⭐ it on{' '}
						<a
							href="https://github.com/vault-developer/event-loop-explorer"
							target="_blank"
						>
							GitHub
						</a>
						!
					</p>
				</Styled.Info>
				{/* <Styled.WelcomeModal> */}
				{!isModalShown && <WelcomeModal />}
				{/* </Styled.WelcomeModal> */}
				<Styled.Editor>
					<Editor />
				</Styled.Editor>
				<Styled.WebApi>
					<span>Web api</span>
					<WebApiQueue />
				</Styled.WebApi>
				<Styled.RenderCallbacks>
					<span>RequestAnimationFrame callbacks</span>
					<RequestAnimationFrameQueue />
				</Styled.RenderCallbacks>
				<Styled.CallStack>
					<span>CallStack</span>
					<CallStack />
				</Styled.CallStack>
				<Styled.Console>
					<span>Console</span>
					<Console />
				</Styled.Console>
				<Styled.Tasks>
					<span>Tasks Queue</span>
					<TasksQueue />
				</Styled.Tasks>
				<Styled.Microtasks>
					<span>Microtasks Queue</span>
					<MicroTasksQueue />
				</Styled.Microtasks>
				<Styled.EventLoop>
					<p id="eventLoop">Event Loop</p>
					<Styled.EventLoopBody>
						<EventLoop />
					</Styled.EventLoopBody>
				</Styled.EventLoop>
			</Styled.Layout>
		</StylesProvider>
	);
}

export default App;
