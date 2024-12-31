import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Sun = styled.svg(
	({ theme }) => css`
		cursor: pointer;
		fill: ${theme.custom.colors.text};
	`
);
