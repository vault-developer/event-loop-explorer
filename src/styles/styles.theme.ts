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
						backgroundColor: isDark ? '#35495a' : '#42729E',
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
			text: 'rgba(0, 0, 0, 0.75)',

			wheel: {
				background: '#81A1BF',
				microtask: {
					disabled: '#9daaa0',
					enabled: '#318a45',
				},
				macrotask: {
					disabled: '#B0ABAF',
					enabled: '#a75793',
				},
				render: {
					disabled: '#AE9A8F',
					enabled: '#b86232',
				},
			},
		},
	},
};
