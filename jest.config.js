export default {
	testEnvironment: 'node',
	testMatch: ['**/*.test.(ts|tsx)'],
	transform: {
		'^.+.tsx?$': ['ts-jest', {}],
	},
};
