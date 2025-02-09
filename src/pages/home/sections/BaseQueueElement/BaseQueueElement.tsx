import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const BaseQueueElement = styled.div<{ isVertical?: boolean }>(
	({ theme: { custom }, isVertical }) => css`
		background: ${custom.com.queueElement.background};
		transition: background-color ${custom.sys.transitions.color};
		animation: ${custom.sys.animations.zoomIn};
		border: 1px solid ${custom.sys.colors.border};
		border-radius: 4px;
		padding: 10px;
		display: flex;
		flex: 1;
		word-wrap: break-word;
		word-break: break-word;
		align-items: center;
		justify-content: center;
		max-width: 33.33%;

		@media (min-width: ${custom.sys.breakpoints.desktop}px) {
			${isVertical &&
			css`
				max-width: unset;
				flex-grow: 0;
			`}
		}
	`
);
