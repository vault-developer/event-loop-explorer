import { PropsWithChildren } from 'react';
import { Box, Modal } from '@mui/material';

// TODO: replace with styled components
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: '#1A2A38',
	p: 4,
};

function InfoModal({
	children,
	isOpen,
	onClose,
}: PropsWithChildren<{ isOpen: boolean; onClose: () => void }>) {
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
			<Box sx={style}>{children}</Box>
		</Modal>
	);
}

export default InfoModal;
