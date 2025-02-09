import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { BaseQueue } from 'pages/home/sections/BaseQueue/BaseQueue.tsx';

export const LogQueue = styled(BaseQueue)(
	({ theme }) => css`
		@media (min-width: ${theme.custom.sys.breakpoints.desktop}px) {
			flex-direction: column;
		}
	`
);
