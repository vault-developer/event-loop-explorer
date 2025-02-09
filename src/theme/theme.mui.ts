import { SystemTokens } from './tokens.sys.ts';
import { createTheme } from '@mui/material';

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
						'.MuiOutlinedInput-notchedOutline': {
							borderColor: st.colors.border,
						},
						transition: st.transitions.color,
					},
				},
			},
			MuiButton: {
				styleOverrides: {
					root: {
						transition: st.transitions.color,
						color: st.colors.onContainer.dim,
					},
				},
			},
			MuiInputLabel: {
				styleOverrides: {
					root: {
						color: st.colors.onContainer.contrast,
					},
				},
			},
		},
	});
