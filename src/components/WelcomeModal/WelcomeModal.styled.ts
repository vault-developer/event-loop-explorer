import styled from '@emotion/styled';
import { Box, css } from '@mui/material';
import InfoClosed from '../CloseIcon/InfoIcon';

export const CloseIcon = styled(InfoClosed)``;

export const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

export const WelcomeModal = styled(Box)(
	({ theme }) => css`
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 700px;
		background: ${theme.custom.colors.wheel.background};
		padding: 40px;
	`
);
