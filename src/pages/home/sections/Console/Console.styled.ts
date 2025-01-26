import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const LogQueue = styled.div(
	({ theme }) => css`
		flex: 1;
		display: flex;
		justify-content: start;
		gap: 20px;

		@media (min-width: ${theme.custom.breakpoints.desktop}px) {
			flex-direction: column;
		}
	`
);

export const Log = styled.div(
	({ theme }) => css`
		background: ${theme.custom.colors.onContainer.dim};
		transition: background-color ${theme.custom.transitions.color};
		animation: ${theme.custom.animations.zoomIn};
		border-radius: 5px;
		padding: 10px;
		word-wrap: break-word;
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
