import styled from 'styled-components';
import { css } from '@mui/material';

export const Closed = styled.svg(
	({ theme }) => css`
		cursor: pointer;
		fill: ${theme.custom.colors.listItemBackground};

		&:hover {
			fill: ${theme.custom.colors.contrastWhiteColor};
		}
	`
);
