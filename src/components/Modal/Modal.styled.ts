import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledBox = styled(Box)(
	({ theme: { custom } }) => css`
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-sizing: border-box;
		background: ${custom.com.modal.background};
		padding: 40px;
		max-width: 400px;
		width: 90%;
		border-radius: 8px;

		@media (min-width: 768px) {
			max-width: 480px;
			width: 100%;
		}
	`
);
