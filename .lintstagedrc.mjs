export default {
	'*.{js,jsx,ts,tsx}': [
		'prettier --write',
		'eslint --fix',
		'jest --passWithNoTests',
		() => 'npm run typecheck',
	],
	'*.{json,css,scss,md}': ['prettier --write', 'eslint --fix'],
};
