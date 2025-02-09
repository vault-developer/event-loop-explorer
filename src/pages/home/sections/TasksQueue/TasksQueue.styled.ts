import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { TransparentButton } from 'components/TransparentButton/TransparentButton.tsx';

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

export const InfoButton = styled(TransparentButton)`
	position: absolute;
	top: 8px;
	right: 8px;
`;

export const CloseButton = styled(TransparentButton)`
	position: absolute;
	top: 12px;
	right: 12px;
`;
