import { Global, ThemeProvider } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { useThemeStore } from 'store/store.ts';
import { getGlobalStyles } from './StylesProvider.utils.ts';
import { getSystemTokens } from '../theme/tokens.sys.ts';
import { getTheme } from '../theme/theme.ts';

export function StylesProvider({ children }: PropsWithChildren) {
	const { isDark } = useThemeStore();
	const mode = isDark ? 'dark' : 'light';
	const theme = getTheme(getSystemTokens(mode), mode);
	const globalStyles = getGlobalStyles({ theme });

	return (
		<ThemeProvider theme={theme}>
			<Global styles={globalStyles} />
			{children}
		</ThemeProvider>
	);
}
