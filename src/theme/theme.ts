import { ColorsSystem } from './colors.ts';
import { createTheme } from '@mui/material';
import { Theme } from '@emotion/react';

export const getMuiTheme = (cs: ColorsSystem) =>
	createTheme({
		palette: {
			mode: cs.mode,
			primary: {
				main: cs.colors.onContainer.contrast,
			},
		},
		typography: {
			fontSize: 12,
		},
		components: {
			MuiTooltip: {
				styleOverrides: {
					tooltip: {
						fontSize: '14',
						color: cs.colors.onContainer.contrast,
						backgroundColor: cs.colors.onContainer.dim,
						transition: 'all 1s ease',
					},
				},
			},
			MuiMenu: {
				styleOverrides: {
					list: {
						backgroundColor: cs.colors.onContainer.dim,
						transition: 'all 1s ease',
					},
				},
			},
			MuiSelect: {
				styleOverrides: {
					root: {
						'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
							borderColor: cs.colors.onContainer.normal,
						},
						transition: 'all 1s ease',
					},
				},
			},
			MuiButton: {
				styleOverrides: {
					root: {
						transition: 'all 1s ease',
					},
				},
			},
			MuiInputLabel: {
				styleOverrides: {
					root: {
						'&.Mui-focused': {
							color: cs.colors.onContainer.contrast,
						},
					},
				},
			},
		},
	});

export const getTheme = (cs: ColorsSystem): Theme => {
	const { colors } = cs;
	return {
		...getMuiTheme(cs),
		custom: {
			mode: cs.mode,
			breakpoints: {
				desktop: 768,
			},
			colorTransition: '1s ease',
			widths: {
				eventLoopRadius: 150,
				eventLoopDiameter: 300,
				eventLoopWheelWidth: 50,
				eventLoopPointerBorderWidth: 4,
			},
			colors: {
				background: colors.background,
				onBackground: colors.onBackground,
				container: colors.container,
				onContainer: {
					dim: colors.onContainer.dim,
					normal: colors.onContainer.normal,
					contrast: colors.onContainer.contrast,
				},
				primary: colors.primary,
				secondary: colors.secondary,
				tertiary: colors.tertiary,
			},
		},
	};
};
