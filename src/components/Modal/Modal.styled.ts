import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Box } from '@mui/material';

export const StyledBox = styled(Box)(
	({ theme, width }) => css`
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: ${width ? `calc(${width} * 1)` : '400px'};
		background: ${theme.custom.colors.wheel.background};
		padding: 40px;

		@media (max-width: 768px) {
			width: ${width ? `calc(${width} * 0.70)` : '300px'};
			padding: 30px;
		}

		@media (max-width: 480px) {
			width: ${width ? `calc(${width} * 0.45)` : '250px'};
			padding: 20px;
		}
	`
);
