import styled from '@emotion/styled';
import { TransparentButton } from 'components/TransparentButton/TransparentButton.tsx';

export const WebApiQueue = styled.div`
	flex: 1;
	display: flex;
	justify-content: start;
	gap: 20px;
`;

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
