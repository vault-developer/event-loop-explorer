import styled from 'styled-components';
import { css } from '@mui/material';

export const LogQueue = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: start;
	gap: 20px;
`;

export const Log = styled.div(
	({ theme }) => css`
		background: ${theme.custom.colors.listItemBackground};
		border-radius: 5px;
		padding: 10px;
		word-wrap: break-word;
	`
);
