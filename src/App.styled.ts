import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Layout = styled.div`
	flex: 1;
	display: grid;
	grid-template-columns: minmax(0, 3fr) minmax(0, 1fr) minmax(0, 3fr);
	grid-template-rows: repeat(36, 1fr);
	grid-gap: 20px;
	padding: 20px;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		grid-template-rows: auto;
		grid-gap: 10px;
	}
`;

const BaseLayoutElement = styled.div(
	({ theme }) => css`
		border: 1px solid ${theme.custom.colors.wheel.background};
		background: ${theme.custom.colors.backgroundNormal};
		margin: 0;
		padding: 10px;
	`
);

const List = styled(BaseLayoutElement)`
	display: flex;
	flex-direction: column;
	padding: 10px;
	gap: 20px;
	overflow: auto;
	position: relative;
`;

export const Info = styled.div`
	grid-column: 1 / 2;
	grid-row: 1 / 5;
	display: flex;
	flex-direction: column;
	justify-content: center;

	@media (max-width: 768px) {
		grid-column: 1;
		grid-row: 1;
	}
`;

export const Editor = styled(BaseLayoutElement)`
	padding: 0;
	grid-column: 1 / 2;
	grid-row: 5 / 31;

	@media (max-width: 768px) {
		grid-column: 1;
		grid-row: 2;
		height: 50vh;
	}
`;

export const WebApi = styled(List)`
	grid-column: 1 / 2;
	grid-row: 31 / 37;

	@media (max-width: 768px) {
		grid-column: 1;
		grid-row: 3;
		height: 10vh;
	}
`;

export const CallStack = styled(List)`
	grid-column: 2 / 3;
	grid-row: 1 / 19;

	@media (max-width: 768px) {
		grid-column: 1;
		grid-row: 4;
		height: 10vh;
	}
`;

export const Console = styled(List)`
	grid-column: 2 / 3;
	grid-row: 19 / 37;

	@media (max-width: 768px) {
		grid-column: 1;
		grid-row: 5;
		height: 10vh;
	}
`;

export const RenderCallbacks = styled(List)`
	grid-column: 3 / 4;
	grid-row: 1 / 7;

	@media (max-width: 768px) {
		grid-column: 1;
		grid-row: 6;
		height: 10vh;
	}
`;

export const Tasks = styled(List)`
	grid-column: 3 / 4;
	grid-row: 7 / 13;

	@media (max-width: 768px) {
		grid-column: 1;
		grid-row: 7;
		height: 10vh;
	}
`;

export const Microtasks = styled(List)`
	grid-column: 3 / 4;
	grid-row: 13 / 19;

	@media (max-width: 768px) {
		grid-column: 1;
		grid-row: 8;
		height: 10vh;
	}
`;

export const EventLoop = styled(BaseLayoutElement)`
	grid-column: 3 / 4;
	grid-row: 19 / 37;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	overflow: auto;
	gap: 10px;
	position: relative;

	@media (max-width: 768px) {
		grid-column: 1;
		grid-row: 9;
		height: 40vh;
	}
`;

export const EventLoopBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex: 1;
`;
