import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const EditorWrapper = styled.div(
	({
		theme: {
			custom: { sys },
		},
	}) => css`
		flex: 1;

		.ace_layer.ace_gutter-layer {
			background: ${sys.colors.container};
			transition: background-color ${sys.transitions.color};
			> div {
				opacity: 0.7;
			}
		}

		.ace_editor {
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 8px;
		}

		.ace_gutter {
			background: ${sys.colors.onContainer.dim};
			transition: background-color ${sys.transitions.color};
		}

		.selected_lines {
			position: absolute;
			background: ${sys.colors.tertiary.contrast};
			transition: background-color ${sys.transitions.color};
			opacity: 0.3;
		}

		.ace_gutter-active-line {
			background: ${sys.colors.onContainer.dim};
			transition: background-color ${sys.transitions.color};
		}

		.ace_content {
			background: ${sys.colors.container};
			transition: background-color ${sys.transitions.color};
		}
	`
);
