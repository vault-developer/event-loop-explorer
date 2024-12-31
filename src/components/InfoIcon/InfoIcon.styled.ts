import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Info = styled.svg(
	({ theme }) => css`
		position: absolute;
		top: 4px;
		right: 4px;
		cursor: pointer;
		fill: ${theme.custom.colors.onContainerNormal};

		&:hover {
			fill: ${theme.custom.colors.text};
		}
	`
);
