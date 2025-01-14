import styled from '@emotion/styled';
import { css } from '@emotion/react';
import InfoClosed from 'components/CloseIcon/InfoIcon.tsx';

export const CircleContainer = styled.div(
	({ theme }) => css`
		position: relative;
		width: ${theme.custom.widths.eventLoopDiameter}px;
		height: ${theme.custom.widths.eventLoopDiameter}px;
		overflow: hidden;
	`
);

export const CircleInner = styled.div(
	({ theme }) => css`
		position: absolute;
		top: ${theme.custom.widths.eventLoopWheelWidth}px;
		left: ${theme.custom.widths.eventLoopWheelWidth}px;
		right: ${theme.custom.widths.eventLoopWheelWidth}px;
		bottom: ${theme.custom.widths.eventLoopWheelWidth}px;
		background: ${theme.custom.colors.container};
		border-radius: 50%;
	`
);

export const CircleOuter = styled.div(
	({ theme }) => css`
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: ${theme.custom.colors.onContainer.dim};
		border-radius: 50%;
	`
);

export const Sector = styled.div<{
	background: string;
	degree: number;
	enabled: boolean;
}>(({ theme, background, degree, enabled }) => {
	const saturation = {
		light: 2,
		dark: 1.3,
	}[theme.custom.mode];
	const brightness = {
		light: {
			enabled: 1.4,
			disabled: 1,
		},
		dark: {
			enabled: 1,
			disabled: 0.8,
		},
	}[theme.custom.mode];
	return css`
		height: ${theme.custom.widths.eventLoopRadius}px;
		width: ${theme.custom.widths.eventLoopDiameter}px;
		overflow: hidden;
		position: absolute;
		transform-origin: 50% 100%;
		transform: rotate(${degree}deg);

		&:before {
			height: inherit;
			width: inherit;
			position: absolute;
			content: '';
			border-radius: ${theme.custom.widths.eventLoopRadius}px
				${theme.custom.widths.eventLoopRadius}px 0 0;
			background-color: ${background};
			filter: saturate(${saturation})
				brightness(${enabled ? brightness.enabled : brightness.disabled});
			opacity: ${enabled ? 1 : 0.3};
			transform-origin: 50% 100%;
			transform: rotate(160deg);
			left: 0;
		}
	`;
});

export const CloseIcon = styled(InfoClosed)`
	position: absolute;
	top: 16px;
	right: 16px;
`;

export const EventLoopBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex: 1;
	padding-top: 10px;
`;
