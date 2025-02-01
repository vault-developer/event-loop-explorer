import { referenceTokens } from './tokens.ref.ts';

const systemTokens = {
	dark: {
		colors: {
			border: 'transparent',
			background: '#1e2226',
			onBackground: '#b6c2cf',
			container: '#15191c',
			onContainer: {
				dim: '#282e33',
				contrast: '#b6c2cf',
			},
			primary: {
				dim: 'rgba(174,71,135, 0.25)',
				contrast: 'rgb(174,71,135)', // yellow 700
			},
			secondary: {
				dim: 'rgba(34,160,107, 0.25)',
				contrast: 'rgb(34,160,107)', // green 700
			},
			tertiary: {
				dim: 'rgba(12,102,228, 0.25)',
				contrast: 'rgb(12,102,228)', // blue 700
			},
		},
	},
	light: {
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
				dim: 'rgba(100, 170, 198, 0.3)',
				contrast: 'rgb(100 170 198)',
			},
			secondary: {
				dim: 'rgba(98, 204, 108, 0.3)',
				contrast: 'rgb(98 204 108)',
			},
			tertiary: {
				dim: 'rgba(233, 126, 137, 0.3)',
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
