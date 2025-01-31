import '@emotion/react';
import { ReferenceTokens } from './theme/tokens.ref.ts';
import { SystemTokens } from './theme/tokens.sys.ts';
import { ComponentTokens } from './theme/tokens.com.ts';

declare module '@emotion/react' {
	export interface Theme {
		custom: {
			mode: 'light' | 'dark';
			ref: ReferenceTokens;
			sys: SystemTokens;
			com: ComponentTokens;
		};
	}
}
