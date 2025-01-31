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
		}

		.ace_gutter {
			background: ${sys.colors.onContainer.dim};
			transition: background-color ${sys.transitions.color};
		}

		.selected_lines {
			position: absolute;
			background: ${sys.colors.tertiary.normal};
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
