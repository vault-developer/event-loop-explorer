import { css, Theme } from '@emotion/react';

export const getGlobalStyles = ({
	theme: {
		custom: { sys },
	},
}: {
	theme: Theme;
}) => css`
	html {
		font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
		color: ${sys.colors.onBackground};
		background-color: ${sys.colors.background};
		height: 100%;
	}

	body {
		background-color: ${sys.colors.background};
		transition: background-color ${sys.transitions.color};
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
		color: ${sys.colors.onBackground};
		transition: all ${sys.transitions.color};
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
		background: ${sys.colors.onContainer.contrast};
	}

	:focus-visible {
		outline: 2px solid ${sys.colors.onContainer.contrast};
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
