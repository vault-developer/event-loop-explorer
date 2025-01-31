import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const CircleContainer = styled.div`
	position: relative;
	width: 300px;
	height: 300px;
	overflow: hidden;
`;

export const SVGContainer = styled.svg(
	({
		theme: {
			custom: { sys },
		},
	}) => css`
		path,
		text,
		circle {
			transition:
				background-color ${sys.transitions.color},
				color ${sys.transitions.color},
				stroke ${sys.transitions.color},
				fill ${sys.transitions.color};
		}
	`
);
