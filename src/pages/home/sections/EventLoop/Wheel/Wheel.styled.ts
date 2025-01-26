import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const CircleContainer = styled.div(
	({ theme }) => css`
		position: relative;
		width: ${theme.custom.widths.eventLoopDiameter}px;
		height: ${theme.custom.widths.eventLoopDiameter}px;
		overflow: hidden;
	`
);

export const SVGContainer = styled.svg(
	({ theme }) => css`
		path,
		text,
		circle {
			transition:
				background-color ${theme.custom.transitions.color},
				color ${theme.custom.transitions.color},
				stroke ${theme.custom.transitions.color},
				fill ${theme.custom.transitions.color};
		}
	`
);
