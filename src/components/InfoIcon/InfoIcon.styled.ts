import styled from 'styled-components';
import { css } from '@mui/material';

export const Info = styled.svg(
	({ theme }) => css`
		position: absolute;
		top: 4px;
		right: 4px;
		cursor: pointer;
		fill: ${theme.custom.colors.listItemBackground};

		&:hover {
			fill: ${theme.custom.colors.contrastWhiteColor};
		}
	`
);
