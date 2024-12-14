import styled from '@emotion/styled';
import Button from '@mui/material/Button';

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

export const SelectWrapper = styled.div`
	margin-top: 20px;
	margin-bottom: 20px;
`;
