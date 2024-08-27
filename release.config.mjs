export default {
	branches: ['master'],
	repositoryUrl: 'https://github.com/vault-developer/event-loop-explorer',
	plugins: [
		'@semantic-release/commit-analyzer',
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		'@semantic-release/npm',
		'@semantic-release/github',
		'@semantic-release/git',
	],
};
