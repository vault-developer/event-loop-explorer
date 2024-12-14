import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Button from '@mui/material/Button';

export const SectionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

export const SliderWrapper = styled.div`
	flex: 1;
	flex-direction: column;
	max-width: 200px;
	padding-top: 16px;
`;

export const CTAButton = styled(Button)`
	display: flex;
	gap: 2px;
	align-items: center;
	min-width: 100px;
	padding: 6px;
`;

export const ButtonsWrapper = styled.div`
	display: flex;
	gap: 8px;
`;

export const ControlsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
	margin-left: 20px;
	margin-right: 20px;
	min-height: 80px;
`;

export const EditorWrapper = styled.div(
	({ theme }) => css`
		flex: 1;

		.ace_gutter {
			background: ${theme.custom.colors.wheel.background};
		}

		.selected_lines {
			position: absolute;
			background: ${theme.custom.colors.wheel.task.disabled};
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
