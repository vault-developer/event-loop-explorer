import { useThemeStore } from 'store/store.ts';
import SunIcon from 'components/SunIcon/SunIcon.tsx';
import MoonIcon from 'components/MoonIcon/MoonIcon.tsx';

export default function Info({ className }: { className?: string }) {
	const { isDark, toggle } = useThemeStore((state) => state);
	return (
		<div className={className}>
			<div
				style={{
					display: 'flex',
					gap: '10px',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<h2>Event Loop Explorer</h2>
				{isDark ? <MoonIcon onClick={toggle} /> : <SunIcon onClick={toggle} />}
			</div>

			<p>
				If you enjoy this project, please {isDark ? '⭐' : '★'} it on{' '}
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
