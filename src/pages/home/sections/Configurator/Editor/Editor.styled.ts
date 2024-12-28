import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const EditorWrapper = styled.div(
	({ theme }) => css`
		flex: 1;

		.ace_gutter {
			background: ${theme.custom.colors.wheel.background};
		}

		.selected_lines {
			position: absolute;
			background: ${theme.custom.colors.wheel.macrotask.disabled};
		}

		.ace_gutter-active-line {
			background: ${theme.custom.colors.wheel.background};
		}

		.ace_content {
			background: ${theme.custom.colors.backgroundNormal};
		}
	`
);
