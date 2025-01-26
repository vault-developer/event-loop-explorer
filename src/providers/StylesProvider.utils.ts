import { css, Theme } from '@emotion/react';

export const getGlobalStyles = ({ theme }: { theme: Theme }) => css`
	html {
		font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
		color: ${theme.custom.colors.onBackground};
		background-color: ${theme.custom.colors.background};
		height: 100%;
	}

	body {
		background-color: ${theme.custom.colors.background};
		transition: background-color ${theme.custom.transitions.color};
	}

	div,
	span,
	p {
		font-size: 14px;
		margin: 0;
	}

	ul,
	ol {
		padding-left: 15px;

		& > li:not(:last-child) {
			margin-bottom: 10px;
		}
	}

	a {
		color: ${theme.custom.colors.onBackground};
		transition: all ${theme.custom.transitions.color};
	}

	body {
		margin: 0;
		display: flex;

		@media (min-width: 768px) {
			height: 100%;
		}
	}

	#root {
		margin: 0;
		text-align: center;
		display: flex;
		height: 100%;
		width: 100%;
		min-height: 814px;

		@media (min-width: 768px) {
			min-width: 1024px;
		}
	}

	::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	::-webkit-scrollbar-thumb {
		background: ${theme.custom.colors.onContainer.normal};
	}

	:focus-visible {
		outline: 2px solid ${theme.custom.colors.onContainer.normal};
	}

	@keyframes zoomIn {
		0% {
			transform: scale(0);
			opacity: 0;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}
`;
