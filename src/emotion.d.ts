import '@emotion/react';

declare module '@emotion/react' {
	export interface Theme {
		custom: {
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
				container: string;
				onContainerNormal: string;
				onContainerContrast: string;
				text: string;

				wheel: {
					background: string;
					microtask: {
						disabled: string;
						enabled: string;
					};
					macrotask: {
						disabled: string;
						enabled: string;
					};
					render: {
						disabled: string;
						enabled: string;
					};
				};
			};
		};
	}
}
