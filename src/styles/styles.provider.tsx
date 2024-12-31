import { Global, ThemeProvider } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { useThemeStore } from 'store/store.ts';
import { darkTheme, lightTheme } from './styles.theme.ts';
import { getGlobalStyles } from './styles.utils.ts';

export function StylesProvider({ children }: PropsWithChildren) {
	const { isDark } = useThemeStore();
	const theme = isDark ? darkTheme : lightTheme;
	const globalStyles = getGlobalStyles({ theme });

	return (
		<ThemeProvider theme={theme}>
			<Global styles={globalStyles} />
			{children}
		</ThemeProvider>
	);
}
