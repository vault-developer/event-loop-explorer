import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import babelParser from '@babel/eslint-parser';

export default [
	{
		ignores: [
			'dist',
			'coverage',
			'playwright-report',
			'test-results',
			'e2e-tests',
		],
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
			},
			parser: babelParser,
			parserOptions: {
				requireConfigFile: false,
				babelOptions: {
					presets: ['@babel/preset-typescript'],
					plugins: [
						['@babel/plugin-syntax-jsx', {}],
					],
				},
				ecmaFeatures: { jsx: true },
			},
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...js.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			// TypeScript handles unused locals; Babel parser can't distinguish type-only params.
			'no-unused-vars': 'off',
			'no-undef': 'off',
		},
	},
];
