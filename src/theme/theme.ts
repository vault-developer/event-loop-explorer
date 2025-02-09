import { SystemTokens } from './tokens.sys.ts';
import { Theme } from '@emotion/react';
import { referenceTokens as ref } from './tokens.ref.ts';
import { getComponentsTokens } from './tokens.com.ts';
import { getMuiTheme } from './theme.mui.ts';

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
