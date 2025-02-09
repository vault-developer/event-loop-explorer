import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const LogQueue = styled.div(
	({ theme }) => css`
		flex: 1;
		display: flex;
		justify-content: start;
		gap: 20px;

		@media (min-width: ${theme.custom.sys.breakpoints.desktop}px) {
			flex-direction: column;
		}
	`
);
