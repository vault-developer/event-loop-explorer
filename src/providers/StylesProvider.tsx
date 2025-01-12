import { Global, ThemeProvider } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { useThemeStore } from 'store/store.ts';
import { getGlobalStyles } from './StylesProvider.utils.ts';
import { colorsDark, colorsLight } from '../theme/colors.ts';
import { getTheme } from '../theme/theme.ts';

export function StylesProvider({ children }: PropsWithChildren) {
	const { isDark } = useThemeStore();
	const palette = isDark ? colorsDark : colorsLight;
	const theme = getTheme(palette);
	const globalStyles = getGlobalStyles({ theme });

	return (
		<ThemeProvider theme={theme}>
			<Global styles={globalStyles} />
			{children}
		</ThemeProvider>
	);
}
