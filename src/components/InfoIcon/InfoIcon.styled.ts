import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Info = styled.svg(
	({ theme: { custom } }) => css`
		position: absolute;
		top: 6px;
		right: 6px;
		cursor: pointer;
		fill: ${custom.com.icon.background};
	`
);
