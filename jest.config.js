export default {
	testEnvironment: 'jsdom',
	collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
	testMatch: ['**/*.test.(ts|tsx)'],
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.app.json' }],
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleNameMapper: {
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
		'^.+\\.svg$': 'jest-transformer-svg',
		'^src/(.*)$': '<rootDir>/src/$1',
	},
};
