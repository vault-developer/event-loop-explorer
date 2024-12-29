import { PropsWithChildren } from 'react';
import { Modal } from '@mui/material';
import { StyledBox } from './Modal.styled.ts';

function InfoModal({
	children,
	isOpened,
	onClose,
}: PropsWithChildren<{ isOpened: boolean; onClose: () => void }>) {
	return (
		<Modal
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
		</Modal>
	);
}

export default InfoModal;
