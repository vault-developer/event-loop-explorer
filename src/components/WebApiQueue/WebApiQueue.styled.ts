import styled from '@emotion/styled';
import InfoClosed from '../CloseIcon/InfoIcon.tsx';

export const WebApiQueue = styled.div`
	flex: 1;
	display: flex;
	justify-content: start;
	gap: 20px;
`;

export const CloseIcon = styled(InfoClosed)`
	position: absolute;
	top: 16px;
	right: 16px;
`;
