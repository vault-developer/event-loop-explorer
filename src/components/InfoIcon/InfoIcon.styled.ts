import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Info = styled.svg(
	({ theme: { custom } }) => css`
		position: absolute;
		top: 4px;
		right: 4px;
		cursor: pointer;
		fill: ${custom.com.icon.background.default};

		&:hover {
			fill: ${custom.com.icon.background.hover};
		}
	`
);
