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
		primary: palette.primary['60'],
		secondary: palette.secondary['60'],
		tertiary: palette.tertiary['60'],
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
		primary: palette.primary['50'],
		secondary: palette.secondary['50'],
		tertiary: palette.tertiary['50'],
	},
};
