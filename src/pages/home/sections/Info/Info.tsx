export default function Info({ className }: { className?: string }) {
	return (
		<div className={className}>
			<h2>Event Loop Explorer</h2>
			<p>
				If you enjoy this project, please ⭐ it on{' '}
				<a
					href="https://github.com/vault-developer/event-loop-explorer"
					target="_blank"
					data-testid="github-repo-link"
				>
					GitHub
				</a>
				!
			</p>
		</div>
	);
}
