import { css } from '@emotion/react';
import styled from '@emotion/styled';
import WebApiQueueBase from './sections/WebApiQueue/WebApiQueue.tsx';
import RequestAnimationFrameQueueBase from './sections/RequestAnimationFrameQueue/RequestAnimationFrameQueue.tsx';
import CallStackBase from './sections/Callstack/Callstack.tsx';
import ConsoleBase from './sections/Console/Console.tsx';
import TasksQueueBase from './sections/TasksQueue/TasksQueue.tsx';
import MicroTasksQueueBase from './sections/MicroTasksQueue/MicroTasksQueue.tsx';
import InfoBase from './sections/Info/Info.tsx';
import ConfiguratorBase from './sections/Configurator/Configurator.tsx';
import EventLoopBase from './sections/Wheel/Wheel.tsx';

export const Layout = styled.div`
	flex: 1;
	display: flex;
	padding: 20px;
	flex-direction: column;
	gap: 20px;

	@media (min-width: 768px) {
		flex-direction: row;
	}
`;

export const FatColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;

	@media (min-width: 768px) {
		flex-basis: calc(42% - 20px);
		flex-grow: 0;
		flex-shrink: 0;
	}
`;

export const ThinColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;

	@media (min-width: 768px) {
		flex-basis: 16%;
		flex-grow: 0;
		flex-shrink: 0;
	}
`;

export const BaseLayoutElement = styled.div(
	({ theme }) => css`
		border: 1px solid ${theme.custom.colors.wheel.background};
		background: ${theme.custom.colors.backgroundNormal};
		margin: 0;
		padding: 10px;
	`
);

export const List = styled(BaseLayoutElement)`
	display: flex;
	flex-direction: column;
	padding: 10px;
	gap: 20px;
	overflow: auto;
	position: relative;
`;

export const Info = styled(InfoBase)`
	display: flex;
	flex-direction: column;
	justify-content: center;

	@media (min-width: 768px) {
		flex-basis: 10%;
	}
`;

export const Configurator = styled(ConfiguratorBase)`
	padding: 0;
	height: 50vh;

	@media (min-width: 768px) {
		flex-basis: 75%;
		height: unset;
	}
`;

export const WebApiQueue = styled(WebApiQueueBase)`
	height: 10vh;

	@media (min-width: 768px) {
		flex-basis: 15%;
		height: unset;
	}
`;

export const CallStack = styled(CallStackBase)`
	height: 10vh;

	@media (min-width: 768px) {
		flex-basis: 50%;
		height: unset;
	}
`;

export const Console = styled(ConsoleBase)`
	height: 10vh;

	@media (min-width: 768px) {
		flex-basis: 50%;
		height: unset;
	}
`;

export const RequestAnimationFrameQueue = styled(
	RequestAnimationFrameQueueBase
)`
	height: 10vh;

	@media (min-width: 768px) {
		flex-basis: 15%;
		height: unset;
	}
`;

export const TasksQueue = styled(TasksQueueBase)`
	height: 10vh;

	@media (min-width: 768px) {
		flex-basis: 15%;
		height: unset;
	}
`;

export const MicroTasksQueue = styled(MicroTasksQueueBase)`
	height: 10vh;

	@media (min-width: 768px) {
		flex-basis: 15%;
		height: unset;
	}
`;

export const EventLoop = styled(EventLoopBase)`
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: auto;
	position: relative;
	height: 40vh;

	@media (min-width: 768px) {
		flex-basis: 50%;
		height: unset;
	}
`;
