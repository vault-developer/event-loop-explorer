import { createTheme } from '@mui/material';
import { Theme } from '@emotion/react';

const getMuiTheme = (isDark: boolean) =>
	createTheme({
		palette: {
			mode: isDark ? 'dark' : 'light',
			primary: {
				main: isDark ? '#35495a' : '#42729E',
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
						color: isDark ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.75)',
						backgroundColor: isDark ? '#35495a' : '#C5D7E7',
					},
				},
			},
			MuiMenu: {
				styleOverrides: {
					list: {
						backgroundColor: isDark ? '#35495a' : '#A9C3DB',
					},
				},
			},
			MuiSelect: {
				styleOverrides: {
					root: {
						'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
							borderColor: isDark ? 'gray' : '#42729E',
						},
					},
				},
			},
			MuiInputLabel: {
				styleOverrides: {
					root: {
						'&.Mui-focused': {
							color: isDark ? 'gray' : '#42729E',
						},
					},
				},
			},
		},
	});

const sharedCustomTheme = {
	breakpoints: {
		desktop: 768,
	},
	widths: {
		eventLoopRadius: 150,
		eventLoopDiameter: 300,
		eventLoopWheelWidth: 50,
		eventLoopPointerBorderWidth: 4,
	},
};

export const darkTheme: Theme = {
	...getMuiTheme(true),
	custom: {
		...sharedCustomTheme,
		colors: {
			background: '#0D151C',
			container: '#131f2a',
			onContainerNormal: '#35495a',
			onContainerContrast: '#3d92e1',
			text: 'rgba(255, 255, 255, 0.87)',

			wheel: {
				background: '#1A2A38',
				microtask: {
					disabled: '#35495a',
					enabled: '#3d92e1',
				},
				macrotask: {
					disabled: '#3e594c',
					enabled: '#0FC469',
				},
				render: {
					disabled: '#64493e',
					enabled: '#d5600c',
				},
			},
		},
	},
};

export const lightTheme: Theme = {
	...getMuiTheme(false),
	custom: {
		...sharedCustomTheme,
		colors: {
			background: '#C5D7E7',
			container: '#A9C3DB',
			onContainerNormal: '#8CAFCF',
			onContainerContrast: '#22476D',
			text: '#1D3D5E',

			wheel: {
				background: '#7797B6',
				microtask: {
					disabled: '#9BAD86',
					enabled: '#B0D982',
				},
				macrotask: {
					disabled: '#CC9076',
					enabled: '#FF8957',
				},
				render: {
					disabled: '#976D84',
					enabled: '#D971AA',
				},
			},
		},
	},
};
