import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { PropsWithChildren, ReactNode } from 'react';
import { getTheme } from '../theme/theme.ts';
import { getSystemTokens } from '../theme/tokens.sys.ts';

const theme = getTheme(getSystemTokens('dark'), 'dark');

const AllTheProviders = ({ children }: PropsWithChildren) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (ui: ReactNode, options?: RenderOptions) =>
	render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
