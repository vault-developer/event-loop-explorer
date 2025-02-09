import styled from '@emotion/styled';
import { css } from '@mui/material';
import { TransparentButton } from 'components/TransparentButton/TransparentButton.tsx';

export const CallbacksQueue = styled.div`
	flex: 1;
	display: flex;
	justify-content: start;
	gap: 20px;
`;

export const Callback = styled.div(
	({ theme: { custom } }) => css`
		background: ${custom.com.queueElement.background};
		transition: background-color ${custom.sys.transitions.color};
		animation: ${custom.sys.animations.zoomIn};
		border: 1px solid ${custom.sys.colors.border};
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
