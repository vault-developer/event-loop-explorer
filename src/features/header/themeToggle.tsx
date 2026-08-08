import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from '@/components/chadcdn/select';
import { THEME_IDS, THEMES, useTheme, type ThemeId } from '@/theme';

function ThemeSwatch({ colors }: { colors: [string, string, string] }) {
	return (
		<span className="flex items-center gap-0.5" aria-hidden="true">
			{colors.map((color) => (
				<span
					key={color}
					className="size-2 rounded-full"
					style={{ backgroundColor: color }}
				/>
			))}
		</span>
	);
}

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<Select value={theme} onValueChange={(value) => setTheme(value as ThemeId)}>
			<SelectTrigger
				size="sm"
				data-testid="theme-toggle"
				aria-label="Select theme"
				className="min-w-0 gap-2 border-transparent bg-transparent shadow-none hover:bg-accent dark:hover:bg-accent/50 transition-colors"
			>
				<ThemeSwatch colors={THEMES[theme].swatch} />
				<span className="hidden sm:inline">{THEMES[theme].label}</span>
			</SelectTrigger>
			<SelectContent align="end" className="min-w-[11rem]">
				{THEME_IDS.map((id) => (
					<SelectItem key={id} value={id}>
						<span className="flex items-center gap-2">
							<ThemeSwatch colors={THEMES[id].swatch} />
							{THEMES[id].label}
						</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
