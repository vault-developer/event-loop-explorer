import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const LabelsWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;

export const Label = styled.p<{ left: number; top: number }>(
	({ left, top }) => css`
		position: absolute;
		left: ${left}px;
		top: ${top}px;
		margin: 0;
		transform: translate(-50%, -50%);
		padding: 10px 7px;
		cursor: default;
	`
);
