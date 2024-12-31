import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const WebApiItem = styled.div(
	({ theme }) => css`
		background: ${theme.custom.colors.onContainerNormal};
		border-radius: 5px;
		padding: 10px;
		position: absolute;
		word-wrap: break-word;
		top: 3px;
		bottom: 3px;
		left: 3px;
		right: 3px;
		display: flex;
		align-items: center;
		justify-content: center;
	`
);

export const Progress = styled.div<{ progress: number }>(
	({ theme, progress }) => css`
		background-color: transparent;
		background-image: conic-gradient(
			${theme.custom.colors.onContainerContrast},
			${theme.custom.colors.onContainerContrast} ${progress}%,
			transparent ${progress}%
		);
		border-radius: 5px;
		position: relative;
		padding: 10px;
		display: flex;
		max-width: 33.33%;
		align-items: center;
		flex: 1;
	`
);
