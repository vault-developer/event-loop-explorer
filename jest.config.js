// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
	testEnvironment: 'jsdom',
	collectCoverageFrom: [
		'{app,components,store,utils}/**/*.{ts,tsx}',
		'!components/chadcdn',
	],
	testMatch: ['**/*.test.(ts|tsx)'],
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleNameMapper: {
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
		'^.+\\.svg$': 'jest-transformer-svg',
		'^@/(.*)$': '<rootDir>/$1',
	},
};

module.exports = createJestConfig(customJestConfig);
