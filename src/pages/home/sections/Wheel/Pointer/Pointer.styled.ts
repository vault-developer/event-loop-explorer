import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const SectorWithInnerBorder = styled.div(
	({
		theme: {
			custom: {
				widths: {
					eventLoopRadius,
					eventLoopDiameter,
					eventLoopWheelWidth,
					eventLoopPointerBorderWidth,
				},
				colors,
			},
		},
	}) => css`
		height: ${eventLoopRadius -
		eventLoopWheelWidth +
		eventLoopPointerBorderWidth}px;
		width: ${eventLoopDiameter -
		eventLoopWheelWidth * 2 +
		eventLoopPointerBorderWidth * 2}px;
		left: ${eventLoopWheelWidth - eventLoopPointerBorderWidth}px;
		top: ${eventLoopWheelWidth - eventLoopPointerBorderWidth}px;
		overflow: hidden;
		position: absolute;
		transform-origin: 50% 100%;
		transform: rotate(279.5deg);
		border-image: linear-gradient(
			to right,
			transparent 50%,
			${colors.text} 50%
		);
		box-sizing: border-box;

		&:before {
			height: inherit;
			width: inherit;
			position: absolute;
			content: '';
			border-radius: ${eventLoopRadius -
				eventLoopWheelWidth +
				eventLoopPointerBorderWidth}px
				${eventLoopRadius - eventLoopWheelWidth + eventLoopPointerBorderWidth}px
				0 0;
			transform-origin: 50% 100%;
			transform: rotate(160deg);
			border-left: ${eventLoopPointerBorderWidth}px solid ${colors.text};
			box-sizing: border-box;
			left: 0;
		}
	`
);

export const SectorWithOuterBorder = styled.div(
	({
		theme: {
			custom: { widths, colors },
		},
	}) => css`
		height: ${widths.eventLoopRadius}px;
		width: ${widths.eventLoopDiameter}px;
		overflow: hidden;
		position: absolute;
		transform-origin: 50% 100%;
		transform: rotate(280deg);
		border-bottom: ${widths.eventLoopPointerBorderWidth}px solid transparent;
		border-image: linear-gradient(to right, transparent 50%, ${colors.text} 50%)
			1;
		box-sizing: border-box;

		&:before {
			height: inherit;
			width: inherit;
			position: absolute;
			content: '';
			border-radius: ${widths.eventLoopRadius}px ${widths.eventLoopRadius}px 0 0;
			border-bottom: ${widths.eventLoopPointerBorderWidth}px solid
				${colors.text};
			transform-origin: 50% 100%;
			transform: rotate(160deg);
			border-left: ${widths.eventLoopPointerBorderWidth}px solid ${colors.text};
			box-sizing: border-box;
			left: 0;
		}
	`
);
