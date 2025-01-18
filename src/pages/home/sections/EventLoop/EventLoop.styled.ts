import styled from '@emotion/styled';
import InfoClosed from 'components/CloseIcon/InfoIcon.tsx';

export const CloseIcon = styled(InfoClosed)`
	position: absolute;
	top: 16px;
	right: 16px;
`;

export const EventLoopBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex: 1;
	padding-top: 10px;
`;
