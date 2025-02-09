import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const BaseLayoutElement = styled.div(
	({ theme: { custom } }) => css`
		border: 1px solid ${custom.sys.colors.border};
		background: ${custom.sys.colors.container};
		transition:
			background-color ${custom.sys.transitions.color},
			border-color ${custom.sys.transitions.color};
		margin: 0;
		padding: 10px;
		border-radius: 8px;
	`
);
