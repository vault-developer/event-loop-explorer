import { useThemeStore } from 'store/store.ts';
import { Icon } from 'components/Icon/Icon.tsx';
import { useTheme } from '@emotion/react';
import { TransparentButton } from 'components/TransparentButton/TransparentButton.tsx';

export default function Info({ className }: { className?: string }) {
	const { isDark, toggle } = useThemeStore((state) => state);
	const theme = useTheme();
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
				<TransparentButton onClick={toggle}>
					<Icon
						variant={isDark ? 'moon' : 'sun'}
						color={theme.custom.sys.colors.onBackground}
					/>
				</TransparentButton>
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
