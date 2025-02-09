import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Callstack = styled.div(
	({ theme }) => css`
		flex: 1;
		display: flex;
		flex-direction: row-reverse;
		justify-content: end;
		gap: 20px;

		@media (min-width: ${theme.custom.sys.breakpoints.desktop}px) {
			flex-direction: column-reverse;
		}
	`
);
