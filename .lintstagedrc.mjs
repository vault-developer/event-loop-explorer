export default {
	'*.{js,jsx,ts,tsx}': [
		'prettier --write',
		'eslint --fix',
		'vitest related --run',
		() => 'npm run typecheck',
	],
	'*.{json,css,scss,md}': ['prettier --write'],
};
