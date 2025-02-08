import { referenceTokens } from './tokens.ref.ts';

const systemTokens = {
	dark: {
		colors: {
			border: referenceTokens.brand['30'],
			background: referenceTokens.brand['5'],
			onBackground: referenceTokens.brand['90'],
			container: referenceTokens.brand['10'],
			onContainer: {
				dim: referenceTokens.brand['15'],
				contrast: referenceTokens.brand['90'],
			},
			primary: {
				dim: 'rgba(86, 121, 135, 0.3)',
				contrast: 'rgba(86, 121, 135, 1)',
			},
			secondary: {
				dim: 'rgba(95, 161, 101, 0.3)',
				contrast: 'rgba(95, 161, 101, 1)',
			},
			tertiary: {
				dim: 'rgba(181, 92, 101, 0.3)',
				contrast: 'rgba(181, 92, 101, 1)',
			},
		},
	},
	light: {
		colors: {
			border: referenceTokens.neutral['70'],
			background: referenceTokens.neutral['95'],
			onBackground: referenceTokens.neutral['20'],
			container: referenceTokens.neutral['98'],
			onContainer: {
				dim: referenceTokens.neutral['90'],
				contrast: referenceTokens.neutral['30'],
			},
			primary: {
				dim: 'rgba(108, 195, 224, 0.3)',
				contrast: 'rgba(108, 195, 224, 1)',
			},
			secondary: {
				dim: 'rgba(75, 206, 151, 0.3)',
				contrast: 'rgba(75, 206, 151, 1)',
			},
			tertiary: {
				dim: 'rgba(247, 151, 210, 0.2)',
				contrast: 'rgba(247, 151, 210, 1)',
			},
		},
	},
	shared: {
		breakpoints: {
			desktop: 768,
		},
		transitions: {
			color: '0.5s ease',
		},
		animations: {
			zoomIn: 'zoomIn 225ms cubic-bezier(0.4, 0, 0.2, 1)',
		},
	},
};

export const getSystemTokens = (mode: 'light' | 'dark') => ({
	...systemTokens.shared,
	...systemTokens[mode],
});

export type SystemTokens = ReturnType<typeof getSystemTokens>;
