import { referenceTokens } from './tokens.ref.ts';

const systemTokens = {
	dark: {
		colors: {
			border: referenceTokens.primary['15'],
			background: referenceTokens.primary['5'],
			onBackground: referenceTokens.primary['90'],
			container: referenceTokens.primary['10'],
			onContainer: {
				dim: referenceTokens.primary['15'],
				contrast: referenceTokens.primary['90'],
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
			border: referenceTokens.neutral['80'],
			background: referenceTokens.neutral['95'],
			onBackground: referenceTokens.neutral['20'],
			container: referenceTokens.neutral['98'],
			onContainer: {
				dim: referenceTokens.neutral['90'],
				contrast: referenceTokens.neutral['30'],
			},
			primary: {
				dim: 'rgba(108,195,224, 0.4)',
				contrast: 'rgb(108,195,224)',
			},
			secondary: {
				dim: 'rgba(75,206,151, 0.4)',
				contrast: 'rgb(75,206,151)',
			},
			tertiary: {
				dim: 'rgba(247,151,210, 0.3)',
				contrast: 'rgb(247,151,210)',
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
