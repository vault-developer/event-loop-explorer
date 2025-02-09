import styled from '@emotion/styled';
import { TransparentButton } from 'components/TransparentButton/TransparentButton.tsx';

export const InfoButton = styled(TransparentButton)`
	position: absolute;
	top: 8px;
	right: 8px;
`;

export const CloseButton = styled(TransparentButton)`
	position: absolute;
	top: 12px;
	right: 12px;
`;

export const EventLoopBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex: 1;
	padding-top: 10px;
`;
