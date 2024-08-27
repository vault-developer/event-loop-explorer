import styled from 'styled-components';
import { css } from '@mui/material';

export const SectionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

export const ControlsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 40px;
	margin-left: 20px;
	margin-right: 20px;
`;

export const EditorWrapper = styled.div(
	({ theme }) => css`
		flex: 1;

		.ace_gutter {
			background: ${theme.custom.colors.wheel.background};
		}

		.ace_gutter-active-line {
			background: ${theme.custom.colors.wheel.background};
		}

		.ace_content {
			background: ${theme.custom.colors.backgroundNormal};
		}
	`
);

export const SelectWrapper = styled.div`
	margin-top: 20px;
	margin-bottom: 20px;
`;
