import { useState } from 'react';
import * as Styled from './WelcomeModal.styled.ts';
import InfoModal from '../Modal/Modal.tsx';

const WelcomeModal = () => {
	const [isOpen, setIsOpen] = useState(true);
	const handleClose = () => {
		setIsOpen(false);
		localStorage.setItem('modalShown', 'true');
	};
	return (
		<InfoModal isOpen={isOpen} onClose={handleClose} width="700px">
			<Styled.ModalHeader>
				<Styled.ModalTitle>
					Welcome to Event Loop Explorer! 🎊
				</Styled.ModalTitle>
				<Styled.CloseIcon onClick={handleClose} />
			</Styled.ModalHeader>
			<p>
				Explore the event loop in JavaScript and learn how the browser executes
				your code.
			</p>
			<p>
				You can add code snippets to the editor and run them to see how they are
				executed under the hood.
			</p>
			<p>
				You can also add callbacks to the Web API, requestAnimationFrame, and
				see how they are executed in the event loop.
			</p>
		</InfoModal>
	);
};

export default WelcomeModal;
