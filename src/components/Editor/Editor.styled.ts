import styled from 'styled-components';
import { css } from '@mui/material';
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
	min-width: 120px;
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
