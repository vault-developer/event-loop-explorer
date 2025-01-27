import { PropsWithChildren } from 'react';
import { Modal as MuiModal } from '@mui/material';
import { StyledBox } from './Modal.styled.ts';

function CustomModal({
	children,
	isOpened,
	onClose,
	testId = 'info-modal',
}: PropsWithChildren<{
	isOpened: boolean;
	onClose: () => void;
	testId?: string;
}>) {
	return (
		<MuiModal
			data-testid={testId}
			open={isOpened}
			onClose={onClose}
			sx={{
				'&.MuiModal-root': {
					lineHeight: 1.5,
					backdropFilter: 'blur(5px)',
					backgroundColor: 'rgba(0, 0, 0, 0.2)',
				},
			}}
		>
			<StyledBox>{children}</StyledBox>
		</MuiModal>
	);
}

export default CustomModal;
