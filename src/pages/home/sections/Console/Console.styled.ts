import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const LogQueue = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: start;
	gap: 20px;
`;

export const Log = styled.div(
	({ theme }) => css`
		background: ${theme.custom.colors.onContainerNormal};
		border-radius: 5px;
		padding: 10px;
		word-wrap: break-word;
	`
);
