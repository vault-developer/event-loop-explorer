import styled from '@emotion/styled';
import { css } from '@emotion/react';
import InfoClosed from 'components/CloseIcon/InfoIcon.tsx';

export const Callstack = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column-reverse;
	justify-content: end;
	gap: 20px;
`;

export const CallstackElement = styled.div(
	({ theme }) => css`
		background: ${theme.custom.colors.onContainerNormal};
		border-radius: 5px;
		padding: 10px;
		word-wrap: break-word;
	`
);

export const CloseIcon = styled(InfoClosed)`
	position: absolute;
	top: 16px;
	right: 16px;
`;
