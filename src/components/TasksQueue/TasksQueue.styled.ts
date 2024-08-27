import styled from 'styled-components';
import { css } from '@mui/material';
import InfoClosed from '../CloseIcon/InfoIcon.tsx';

export const TasksQueue = styled.div`
	flex: 1;
	display: flex;
	justify-content: start;
	gap: 20px;
`;

export const Task = styled.div(
	({ theme }) => css`
		background: ${theme.custom.colors.listItemBackground};
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
		max-width: 33.33%;
		padding: 10px;
		word-wrap: break-word;
	`
);

export const CloseIcon = styled(InfoClosed)`
	position: absolute;
	top: 16px;
	right: 16px;
`;
