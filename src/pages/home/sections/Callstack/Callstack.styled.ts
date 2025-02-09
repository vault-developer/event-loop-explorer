import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { BaseQueue } from '../BaseQueue/BaseQueue.tsx';

export const Callstack = styled(BaseQueue)(
	({ theme }) => css`
		flex-direction: row-reverse;
		justify-content: end;

		@media (min-width: ${theme.custom.sys.breakpoints.desktop}px) {
			flex-direction: column-reverse;
		}
	`
);
