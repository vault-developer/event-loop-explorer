import styled from '@emotion/styled';

export const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

export const ModalTitle = styled.h1`
	font-size: 2rem;
	margin: 0;
	padding-block-end: 10px;

	@media (max-width: 768px) {
		fontsize: 1.8rem;
	}

	@media (max-width: 480px) {
		fontsize: 1.5rem;
	}
`;
