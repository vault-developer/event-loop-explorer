import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledBox = styled(Box)(
	({ theme }) => css`
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-sizing: border-box;
		background: ${theme.custom.colors.container};
		padding: 40px;
		max-width: 400px;
		width: 90%;

		@media (min-width: 768px) {
			max-width: 480px;
			width: 100%;
		}
	`
);
