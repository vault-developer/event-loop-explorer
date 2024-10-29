import { PropsWithChildren } from 'react';
import { Modal } from '@mui/material';
import { StyledBox } from './Modal.styled.ts';

function InfoModal({
	children,
	isOpen,
	onClose,
	width,
}: PropsWithChildren<{
	isOpen: boolean;
	onClose: () => void;
	width?: string;
}>) {
	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			sx={{
				'&.MuiModal-root': {
					lineHeight: 1.5,
					backdropFilter: 'blur(5px)',
					backgroundColor: 'rgba(0, 0, 0, 0.2)',
				},
			}}
		>
			<StyledBox width={width}>{children}</StyledBox>
		</Modal>
	);
}

export default InfoModal;
