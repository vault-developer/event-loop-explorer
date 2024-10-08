import '@emotion/react';

declare module '@emotion/react' {
	export interface Theme {
		custom: {
			widths: {
				eventLoopRadius: number;
				eventLoopDiameter: number;
				eventLoopWheelWidth: number;
				eventLoopPointerBorderWidth: number;
			};
			colors: {
				contrastWhiteColor: string;
				backgroundDark: string;
				backgroundNormal: string;
				listItemBackground: string;
				listItemBackgroundBorder: string;
				wheel: {
					background: string;
					microtask: {
						disabled: string;
						enabled: string;
					};
					task: {
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
