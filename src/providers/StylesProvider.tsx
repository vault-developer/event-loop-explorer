import { createTheme } from '@mui/material';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { PropsWithChildren } from 'react';

const muiTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#35495a',
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
					color: 'rgba(255, 255, 255, 0.87)',
					backgroundColor: '#35495a',
				},
			},
		},
		MuiMenu: {
			styleOverrides: {
				list: {
					backgroundColor: '#35495a',
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				root: {
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: 'gray',
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					'&.Mui-focused': {
						color: 'gray',
					},
				},
			},
		},
	},
});

const theme = {
	...muiTheme,
	custom: {
		widths: {
			eventLoopRadius: 150,
			eventLoopDiameter: 300,
			eventLoopWheelWidth: 50,
			eventLoopPointerBorderWidth: 4,
		},
		colors: {
			contrastWhiteColor: 'rgba(255, 255, 255, 0.87)',

			backgroundDark: '#0D151C',
			backgroundNormal: '#131f2a',

			listItemBackground: '#35495a',
			listItemBackgroundBorder: '#3d92e1',

			wheel: {
				background: '#1A2A38',
				microtask: {
					disabled: '#35495a',
					enabled: '#3d92e1',
				},
				task: {
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

const GlobalStyles = createGlobalStyle(
	({ theme }) => `
  html {
      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
      color: ${theme.custom.colors.contrastWhiteColor};
      background-color: ${theme.custom.colors.backgroundDark};
      height: 100%;
  }

  div, span, p {
      font-size: 14px;
      margin: 0;
  }

  ul, ol {
			padding-left: 15px;

			&>li:not(:last-child) {
				margin-bottom: 10px;
			}
  }

  a {
		color: ${theme.custom.colors.contrastWhiteColor};
  }

  body {
      margin: 0;
      display: flex;
      height: 100%;
  }

  #root {
      min-width: 1024px;
      margin: 0;
      text-align: center;
      display: flex;
      height: 100%;
      width: 100%;
      min-height: 814px;
  }

  ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
  }
  ::-webkit-scrollbar-thumb {
      background: ${theme.custom.colors.listItemBackground};
  }

  :focus-visible {
  		outline: 2px solid ${theme.custom.colors.listItemBackground};
  }
`
);

function StylesProvider({ children }: PropsWithChildren) {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			{children}
		</ThemeProvider>
	);
}

export default StylesProvider;
