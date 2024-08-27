export default {
	'*.{js,jsx,ts,tsx}': [
		'yarn prettier --write',
		'yarn eslint --fix',
		() => 'yarn typecheck',
	],
	'*.{json,css,scss,md}': ['yarn prettier --write', 'yarn eslint --fix'],
};
