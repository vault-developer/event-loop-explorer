import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const EditorWrapper = styled.div(
	({ theme }) => css`
		flex: 1;

		.ace_layer.ace_gutter-layer {
			background: ${theme.custom.colors.container};
		}

		.ace_gutter {
			background: ${theme.custom.colors.onContainer.dim};
		}

		.selected_lines {
			position: absolute;
			background: ${theme.custom.colors.tertiary.normal};
			opacity: 0.3;
		}

		.ace_gutter-active-line {
			background: ${theme.custom.colors.onContainer.dim};
		}

		.ace_content {
			background: ${theme.custom.colors.container};
		}
	`
);
