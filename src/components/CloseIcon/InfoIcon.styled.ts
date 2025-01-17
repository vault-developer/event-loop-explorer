import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Closed = styled.svg(
	({ theme }) => css`
		cursor: pointer;
		fill: ${theme.custom.colors.onContainer.normal};

		&:hover {
			fill: ${theme.custom.colors.onContainer.contrast};
		}
	`
);
