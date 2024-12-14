import * as Styled from './Home.styled.ts';
import CallStack from './sections/Callstack/Callstack.tsx';
import Console from './sections/Console/Console.tsx';
import Editor from './sections/Editor/Editor.tsx';
import EventLoop from './sections/EventLoop/EventLoop.tsx';
import MicroTasksQueue from './sections/MicroTasksQueue/MicroTasksQueue.tsx';
import RequestAnimationFrameQueue from './sections/RenderCallbacksQueue/RequestAnimationFrameQueue.tsx';
import TasksQueue from './sections/TasksQueue/TasksQueue.tsx';
import WebApiQueue from './sections/WebApiQueue/WebApiQueue.tsx';

export default function Home() {
	return (
		<Styled.Layout>
			<Styled.Info>
				<h2>Event Loop Explorer</h2>
				<p>
					If you enjoy this project, please ⭐ it on{' '}
					<a
						href="https://github.com/vault-developer/event-loop-explorer"
						target="_blank"
						data-testid="github-repo-link"
					>
						GitHub
					</a>
					!
				</p>
			</Styled.Info>
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
	);
}
