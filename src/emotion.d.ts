import '@emotion/react';
import { ReferenceTokens } from './theme/tokens.ref.ts';
import { SystemTokens } from './theme/tokens.sys.ts';

declare module '@emotion/react' {
	export interface Theme {
		custom: {
			mode: 'light' | 'dark';
			ref: ReferenceTokens;
			sys: SystemTokens;
			com: object;
		};
	}
}
