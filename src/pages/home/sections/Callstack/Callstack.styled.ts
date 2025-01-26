import styled from '@emotion/styled';
import { css } from '@emotion/react';
import InfoClosed from 'components/CloseIcon/InfoIcon.tsx';

export const Callstack = styled.div(
	({ theme }) => css`
		flex: 1;
		display: flex;
		flex-direction: row-reverse;
		justify-content: end;
		gap: 20px;

		@media (min-width: ${theme.custom.breakpoints.desktop}px) {
			flex-direction: column-reverse;
		}
	`
);

export const CallstackElement = styled.div(
	({ theme }) => css`
		background: ${theme.custom.colors.onContainer.dim};
		transition: background-color ${theme.custom.transitions.color};
		animation: ${theme.custom.animations.zoomIn};
		border-radius: 5px;
		padding: 10px;
		word-wrap: break-word;
		word-break: break-word;
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		max-width: 33.33%;

		@media (min-width: ${theme.custom.breakpoints.desktop}px) {
			max-width: unset;
			flex-grow: 0;
		}
	`
);

export const CloseIcon = styled(InfoClosed)`
	position: absolute;
	top: 16px;
	right: 16px;
`;
