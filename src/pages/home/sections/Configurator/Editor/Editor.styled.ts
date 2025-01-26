import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const EditorWrapper = styled.div(
	({ theme }) => css`
		flex: 1;

		.ace_layer.ace_gutter-layer {
			background: ${theme.custom.colors.container};
			transition: background-color ${theme.custom.transitions.color};
		}

		.ace_gutter {
			background: ${theme.custom.colors.onContainer.dim};
			transition: background-color ${theme.custom.transitions.color};
		}

		.selected_lines {
			position: absolute;
			background: ${theme.custom.colors.tertiary.normal};
			transition: background-color ${theme.custom.transitions.color};
			opacity: 0.3;
		}

		.ace_gutter-active-line {
			background: ${theme.custom.colors.onContainer.dim};
			transition: background-color ${theme.custom.transitions.color};
		}

		.ace_content {
			background: ${theme.custom.colors.container};
			transition: background-color ${theme.custom.transitions.color};
		}
	`
);
