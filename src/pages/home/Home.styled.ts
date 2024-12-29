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
	display: grid;
	padding: 20px;
	grid-template-columns: 1fr;
	grid-template-rows: auto;
	grid-gap: 10px;

	@media (min-width: 768px) {
		grid-template-columns: minmax(0, 3fr) minmax(0, 1fr) minmax(0, 3fr);
		grid-template-rows: repeat(36, 1fr);
		grid-gap: 20px;
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
	grid-column: 1;
	grid-row: 1;

	@media (min-width: 768px) {
		grid-column: 1 / 2;
		grid-row: 1 / 5;
	}
`;

export const Configurator = styled(ConfiguratorBase)`
	padding: 0;
	grid-column: 1;
	grid-row: 2;
	height: 50vh;

	@media (min-width: 768px) {
		grid-column: 1 / 2;
		grid-row: 5 / 31;
		height: unset;
	}
`;

export const WebApiQueue = styled(WebApiQueueBase)`
	grid-column: 1;
	grid-row: 3;
	height: 10vh;

	@media (min-width: 768px) {
		grid-column: 1 / 2;
		grid-row: 31 / 37;
		height: unset;
	}
`;

export const CallStack = styled(CallStackBase)`
	grid-column: 1;
	grid-row: 4;
	height: 10vh;

	@media (min-width: 768px) {
		grid-column: 2 / 3;
		grid-row: 1 / 19;
		height: unset;
	}
`;

export const Console = styled(ConsoleBase)`
	grid-column: 1;
	grid-row: 5;
	height: 10vh;

	@media (min-width: 768px) {
		grid-column: 2 / 3;
		grid-row: 19 / 37;
		height: unset;
	}
`;

export const RequestAnimationFrameQueue = styled(
	RequestAnimationFrameQueueBase
)`
	grid-column: 1;
	grid-row: 6;
	height: 10vh;

	@media (min-width: 768px) {
		grid-column: 3 / 4;
		grid-row: 1 / 7;
		height: unset;
	}
`;

export const TasksQueue = styled(TasksQueueBase)`
	grid-column: 1;
	grid-row: 7;
	height: 10vh;

	@media (min-width: 768px) {
		grid-column: 3 / 4;
		grid-row: 7 / 13;
		height: unset;
	}
`;

export const MicroTasksQueue = styled(MicroTasksQueueBase)`
	grid-column: 1;
	grid-row: 8;
	height: 10vh;

	@media (min-width: 768px) {
		grid-column: 3 / 4;
		grid-row: 13 / 19;
		height: unset;
	}
`;

export const EventLoop = styled(EventLoopBase)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	overflow: auto;
	gap: 10px;
	position: relative;
	grid-column: 1;
	grid-row: 9;
	height: 40vh;

	@media (min-width: 768px) {
		grid-column: 3 / 4;
		grid-row: 19 / 37;
		height: unset;
	}
`;
