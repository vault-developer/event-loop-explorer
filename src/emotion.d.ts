import '@emotion/react';

declare module '@emotion/react' {
	export interface Theme {
		custom: {
			mode: 'light' | 'dark';
			breakpoints: {
				desktop: number;
			};
			widths: {
				eventLoopRadius: number;
				eventLoopDiameter: number;
				eventLoopWheelWidth: number;
				eventLoopPointerBorderWidth: number;
			};
			colors: {
				background: string;
				onBackground: string;
				container: string;
				onContainer: {
					dim: string;
					normal: string;
					contrast: string;
				};
				primary: string;
				secondary: string;
				tertiary: string;
			};
		};
	}
}
