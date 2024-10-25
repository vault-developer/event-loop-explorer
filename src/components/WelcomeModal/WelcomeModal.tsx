import { useState } from 'react';
import * as Styled from './WelcomeModal.styled.ts';
import { Modal } from '@mui/material';

const WelcomeModal = () => {
	const [isOpen, setIsOpen] = useState(true);
	return (
		<Modal
			open={isOpen}
			onClose={() => setIsOpen(false)}
			sx={{
				'&.MuiModal-root': {
					lineHeight: 1.5,
					backdropFilter: 'blur(5px)',
					backgroundColor: 'rgba(0, 0, 0, 0.2)',
				},
			}}
		>
			<Styled.WelcomeModal>
				<Styled.ModalHeader>
					<h1>Welcome to Event Loop Explorer! 🎊</h1>
					<Styled.CloseIcon onClick={() => setIsOpen(false)} />
				</Styled.ModalHeader>
				<p>
					Explore the event loop in JavaScript and learn how the browser
					executes your code.
				</p>
				<p>
					You can add code snippets to the editor and run them to see how they
					are executed under the hood.
				</p>
				<p>
					You can also add callbacks to the Web API, requestAnimationFrame, and
					see how they are executed in the event loop.
				</p>
			</Styled.WelcomeModal>
		</Modal>
	);
};

export default WelcomeModal;
