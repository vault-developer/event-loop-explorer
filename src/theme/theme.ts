import { SystemTokens } from './tokens.sys.ts';
import { createTheme } from '@mui/material';
import { Theme } from '@emotion/react';
import { referenceTokens as ref } from './tokens.ref.ts';
import { getComponentsTokens } from './tokens.com.ts';

export const getMuiTheme = (st: SystemTokens, mode: 'dark' | 'light') =>
	createTheme({
		palette: {
			mode,
			primary: {
				main: st.colors.onContainer.contrast,
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
						color: st.colors.onContainer.contrast,
						backgroundColor: st.colors.onContainer.dim,
						transition: st.transitions.color,
					},
				},
			},
			MuiMenu: {
				styleOverrides: {
					list: {
						backgroundColor: st.colors.onContainer.dim,
						transition: st.transitions.color,
					},
				},
			},
			MuiSelect: {
				styleOverrides: {
					root: {
						'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
							borderColor: st.colors.onContainer.contrast,
						},
						transition: st.transitions.color,
					},
				},
			},
			MuiButton: {
				styleOverrides: {
					root: {
						transition: st.transitions.color,
					},
				},
			},
			MuiInputLabel: {
				styleOverrides: {
					root: {
						'&.Mui-focused': {
							color: st.colors.onContainer.contrast,
						},
					},
				},
			},
		},
	});

export const getTheme = (sys: SystemTokens, mode: 'dark' | 'light'): Theme => {
	return {
		...getMuiTheme(sys, mode),
		custom: {
			mode,
			ref,
			sys,
			com: getComponentsTokens(sys),
		},
	};
};
