import { useTheme } from 'next-themes';
import { Button } from '@/components/chadcdn/button';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
	const { setTheme, theme } = useTheme();
	const onToggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

	return (
		<Button
			variant="ghost"
			size="iconBig"
			onClick={onToggle}
			data-testid="theme-toggle"
		>
			<Sun
				className="absolute scale-100 dark:scale-0 rotate-0 dark:rotate-90 transition-all size-6"
				size={24}
			/>
			<Moon
				className="absolute scale-0 dark:scale-100 rotate-90 dark:rotate-0 transition-all size-6"
				size={24}
			/>
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
