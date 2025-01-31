import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import WebApiQueueBase from './sections/WebApiQueue/WebApiQueue.tsx';
import RequestAnimationFrameQueueBase from './sections/RequestAnimationFrameQueue/RequestAnimationFrameQueue.tsx';
import CallStackBase from './sections/Callstack/Callstack.tsx';
import ConsoleBase from './sections/Console/Console.tsx';
import TasksQueueBase from './sections/TasksQueue/TasksQueue.tsx';
import MicroTasksQueueBase from './sections/MicroTasksQueue/MicroTasksQueue.tsx';
import InfoBase from './sections/Info/Info.tsx';
import ConfiguratorBase from './sections/Configurator/Configurator.tsx';
import EventLoopBase from 'pages/home/sections/EventLoop/EventLoop.tsx';

export const sharedColumnStyles = ({ theme }: { theme: Theme }) => css`
	display: flex;
	flex-direction: column;
	gap: 20px;

	@media (min-width: ${theme.custom.sys.breakpoints.desktop}px) {
		flex-grow: 0;
		flex-shrink: 0;
		overflow: hidden;
	}
`;

export const Layout = styled.div(
	({ theme }) => css`
		flex: 1;
		display: flex;
		padding: 20px;
		flex-direction: column;
		gap: 20px;

		@media (min-width: ${theme.custom.sys.breakpoints.desktop}px) {
			flex-direction: row;
			overflow: hidden;
		}
	`
);

export const WideColumn = styled.div(
	({ theme }) => css`
		${sharedColumnStyles({ theme })};

		@media (min-width: ${theme.custom.sys.breakpoints.desktop}px) {
			flex-basis: calc(43% - 20px);
		}
	`
);

export const NarrowColumn = styled.div(
	({ theme }) => css`
		${sharedColumnStyles({ theme })};

		@media (min-width: ${theme.custom.sys.breakpoints.desktop}px) {
			flex-basis: 14%;
		}
	`
);

export const BaseLayoutElement = styled.div(
	({ theme: { custom } }) => css`
		border: 1px solid ${custom.sys.colors.border};
		background: ${custom.sys.colors.container};
		transition:
			background-color ${custom.sys.transitions.color},
			border-color ${custom.sys.transitions.color};
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

export const sharedComponentStyles = ({ theme }: { theme: Theme }) => css`
	min-height: 10vh;
	@media (min-width: ${theme.custom.sys.breakpoints.desktop}px) {
		min-height: unset;
	}
`;

export const Info = styled(InfoBase)(
	({ theme }) => css`
		display: flex;
		flex-direction: column;
		justify-content: center;

		@media (min-width: ${theme.custom.sys.breakpoints.desktop}px) {
			flex-basis: 10%;
		}
	`
);

export const Configurator = styled(ConfiguratorBase)(
	({ theme }) => css`
		padding: 0;
		min-height: 50vh;

		@media (min-width: ${theme.custom.sys.breakpoints.desktop}px) {
			flex-basis: 75%;
			min-height: unset;
		}
	`
);

export const WebApiQueue = styled(WebApiQueueBase)(
	({ theme }) => css`
		${sharedComponentStyles({ theme })};

		@media (min-width: ${theme.custom.sys.breakpoints.desktop}px) {
			flex-basis: 15%;
		}
	`
);

export const CallStack = styled(CallStackBase)(
	({ theme }) => css`
		${sharedComponentStyles({ theme })};

		@media (min-width: ${theme.custom.sys.breakpoints.desktop}px) {
			flex-basis: 40%;
		}
	`
);

export const Console = styled(ConsoleBase)(
	({ theme }) => css`
		${sharedComponentStyles({ theme })};

		@media (min-width: ${theme.custom.sys.breakpoints.desktop}px) {
			flex-basis: 60%;
		}
	`
);

export const RequestAnimationFrameQueue = styled(
	RequestAnimationFrameQueueBase
)(
	({ theme }) => css`
		${sharedComponentStyles({ theme })};

		@media (min-width: ${theme.custom.sys.breakpoints.desktop}px) {
			flex-basis: 15%;
		}
	`
);

export const TasksQueue = styled(TasksQueueBase)(
	({ theme }) => css`
		${sharedComponentStyles({ theme })};

		@media (min-width: ${theme.custom.sys.breakpoints.desktop}px) {
			flex-basis: 15%;
		}
	`
);

export const MicroTasksQueue = styled(MicroTasksQueueBase)(
	({ theme }) => css`
		${sharedComponentStyles({ theme })};

		@media (min-width: ${theme.custom.sys.breakpoints.desktop}px) {
			flex-basis: 15%;
		}
	`
);

export const EventLoop = styled(EventLoopBase)(
	({ theme }) => css`
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
		position: relative;
		min-height: 40vh;

		@media (min-width: ${theme.custom.sys.breakpoints.desktop}px) {
			flex-basis: 45%;
			min-height: unset;
			overflow: hidden;
		}
	`
);
