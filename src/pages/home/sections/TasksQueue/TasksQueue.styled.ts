import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const TasksQueue = styled.div`
	flex: 1;
	display: flex;
	justify-content: start;
	gap: 20px;
`;

export const Task = styled.div(
	({
		theme: {
			custom: { com, sys },
		},
	}) => css`
		background: ${com.queueElement.background};
		border: 1px solid ${sys.colors.border};
		transition: background-color ${sys.transitions.color};
		animation: ${sys.animations.zoomIn};
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 4px;
		max-width: 33.33%;
		padding: 10px;
		word-wrap: break-word;
	`
);
