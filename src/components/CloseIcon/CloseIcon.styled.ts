import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const CloseIcon = styled.svg(
	({ theme: { custom } }) => css`
		cursor: pointer;
		fill: ${custom.com.icon.background};
	`
);
