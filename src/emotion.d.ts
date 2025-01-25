import '@emotion/react';

declare module '@emotion/react' {
	export interface Theme {
		custom: {
			mode: 'light' | 'dark';
			breakpoints: {
				desktop: number;
			};
			colorTransition: string;
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
				primary: {
					dim: string;
					normal: string;
					contrast: string;
				};
				secondary: {
					dim: string;
					normal: string;
					contrast: string;
				};
				tertiary: {
					dim: string;
					normal: string;
					contrast: string;
				};
			};
		};
	}
}
