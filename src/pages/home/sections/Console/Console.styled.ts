import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const LogQueue = styled.div(
	({ theme }) => css`
		flex: 1;
		display: flex;
		justify-content: start;
		gap: 20px;

		@media (min-width: ${theme.custom.sys.breakpoints.desktop}px) {
			flex-direction: column;
		}
	`
);

export const Log = styled.div(
	({
		theme: {
			custom: { sys, com },
		},
	}) => css`
		background: ${com.queueElement.background};
		transition: background-color ${sys.transitions.color};
		animation: ${sys.animations.zoomIn};
		border: 1px solid ${sys.colors.border};
		border-radius: 5px;
		padding: 10px;
		word-wrap: break-word;
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		max-width: 33.33%;

		@media (min-width: ${sys.breakpoints.desktop}px) {
			max-width: unset;
			flex-grow: 0;
		}
	`
);
