import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Box } from '@mui/material';


export const StyledBox = styled(Box)(
	({ theme }) => css`
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-width: 480px;
		width: 100%;
		box-sizing: border-box;
		background: ${theme.custom.colors.wheel.background};
		padding: 40px;

		@media (max-width: 768px) {
			max-width: 400px;
			width: 90%;
		}
	`
);
