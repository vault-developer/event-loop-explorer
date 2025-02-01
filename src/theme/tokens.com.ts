import { SystemTokens } from './tokens.sys.ts';

export const getComponentsTokens = (st: SystemTokens) => ({
	wheel: {
		background: st.colors.onContainer.dim,
		pointer: st.colors.onContainer.contrast,
		render: {
			dim: st.colors.tertiary.dim,
			contrast: st.colors.tertiary.contrast,
		},
		macrotask: {
			dim: st.colors.secondary.dim,
			contrast: st.colors.secondary.contrast,
		},
		microtask: {
			dim: st.colors.primary.dim,
			contrast: st.colors.primary.contrast,
		},
	},
	modal: {
		background: st.colors.container,
	},
	queueElement: {
		background: st.colors.onContainer.dim,
		borderActive: st.colors.onContainer.contrast,
	},
	queue: {
		background: st.colors.container,
	},
	text: st.colors.onBackground,
	icon: {
		background: st.colors.onContainer.contrast,
	},
});

export type ComponentTokens = ReturnType<typeof getComponentsTokens>;
