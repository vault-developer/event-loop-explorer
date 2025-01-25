import { PaletteMode } from '@mui/material';
import { palette } from './palette.ts';

export type ColorsSystem = typeof colorsLight | typeof colorsDark;

export const colorsDark = {
	mode: 'dark' as PaletteMode,
	colors: {
		background: palette.primary['5'],
		onBackground: palette.primary['90'],
		container: palette.primary['10'],
		onContainer: {
			dim: palette.primary['15'],
			normal: palette.primary['50'],
			contrast: palette.primary['90'],
		},
		primary: {
			dim: 'rgba(86, 121, 135, 0.3)',
			normal: palette.primary['60'],
			contrast: 'rgba(86, 121, 135, 1)',
		},
		secondary: {
			dim: 'rgba(95, 161, 101, 0.3)',
			normal: palette.secondary['60'],
			contrast: 'rgba(95, 161, 101, 1)',
		},
		tertiary: {
			dim: 'rgba(181, 92, 101, 0.3)',
			normal: palette.tertiary['60'],
			contrast: 'rgba(181, 92, 101, 1)',
		},
	},
};

export const colorsLight = {
	mode: 'light' as PaletteMode,
	colors: {
		background: palette.primary['95'],
		onBackground: palette.primary['20'],
		container: palette.primary['90'],
		onContainer: {
			dim: palette.primary['80'],
			normal: palette.primary['50'],
			contrast: palette.primary['30'],
		},
		primary: {
			dim: 'rgba(86, 121, 135, 0.3)',
			normal: palette.primary['50'],
			contrast: 'rgb(100 170 198)',
		},
		secondary: {
			dim: 'rgba(95, 161, 101, 0.3)',
			normal: palette.secondary['50'],
			contrast: 'rgb(98 204 108)',
		},
		tertiary: {
			dim: 'rgba(181, 92, 101, 0.3)',
			normal: palette.tertiary['50'],
			contrast: 'rgb(233 126 137)',
		},
	},
};
