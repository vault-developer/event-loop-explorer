import { referenceTokens } from './tokens.ref.ts';

const systemTokens = {
	light: {
		colors: {
			border: referenceTokens.primary['15'],
			background: referenceTokens.primary['5'],
			onBackground: referenceTokens.primary['90'],
			container: referenceTokens.primary['10'],
			onContainer: {
				dim: referenceTokens.primary['15'],
				normal: referenceTokens.primary['50'],
				contrast: referenceTokens.primary['90'],
			},
			primary: {
				dim: 'rgba(86, 121, 135, 0.3)',
				normal: referenceTokens.primary['60'],
				contrast: 'rgba(86, 121, 135, 1)',
			},
			secondary: {
				dim: 'rgba(95, 161, 101, 0.3)',
				normal: referenceTokens.secondary['60'],
				contrast: 'rgba(95, 161, 101, 1)',
			},
			tertiary: {
				dim: 'rgba(181, 92, 101, 0.3)',
				normal: referenceTokens.tertiary['60'],
				contrast: 'rgba(181, 92, 101, 1)',
			},
		},
	},
	dark: {
		colors: {
			border: referenceTokens.primary['80'],
			background: referenceTokens.primary['95'],
			onBackground: referenceTokens.primary['20'],
			container: referenceTokens.primary['90'],
			onContainer: {
				dim: referenceTokens.primary['80'],
				normal: referenceTokens.primary['50'],
				contrast: referenceTokens.primary['30'],
			},
			primary: {
				dim: 'rgba(86, 121, 135, 0.3)',
				normal: referenceTokens.primary['50'],
				contrast: 'rgb(100 170 198)',
			},
			secondary: {
				dim: 'rgba(95, 161, 101, 0.3)',
				normal: referenceTokens.secondary['50'],
				contrast: 'rgb(98 204 108)',
			},
			tertiary: {
				dim: 'rgba(181, 92, 101, 0.3)',
				normal: referenceTokens.tertiary['50'],
				contrast: 'rgb(233 126 137)',
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
