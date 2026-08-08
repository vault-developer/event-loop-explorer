import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';

export type ThemeId =
	| 'midnight'
	| 'paper'
	| 'nord'
	| 'dracula'
	| 'monokai'
	| 'catppuccin'
	| 'solarized'
	| 'github';

export type ThemeMode = 'light' | 'dark';

export type ThemeDefinition = {
	id: ThemeId;
	label: string;
	mode: ThemeMode;
	aceTheme: string;
	swatch: [string, string, string];
};

export const THEMES: Record<ThemeId, ThemeDefinition> = {
	midnight: {
		id: 'midnight',
		label: 'Midnight',
		mode: 'dark',
		aceTheme: 'one_dark',
		swatch: ['#60a5fa', '#4ade80', '#fb7185'],
	},
	paper: {
		id: 'paper',
		label: 'Paper',
		mode: 'light',
		aceTheme: 'textmate',
		swatch: ['#2563eb', '#16a34a', '#e11d48'],
	},
	nord: {
		id: 'nord',
		label: 'Nord',
		mode: 'dark',
		aceTheme: 'nord_dark',
		swatch: ['#81a1c1', '#a3be8c', '#bf616a'],
	},
	dracula: {
		id: 'dracula',
		label: 'Dracula',
		mode: 'dark',
		aceTheme: 'dracula',
		swatch: ['#8be9fd', '#50fa7b', '#ff79c6'],
	},
	monokai: {
		id: 'monokai',
		label: 'Monokai',
		mode: 'dark',
		aceTheme: 'monokai',
		swatch: ['#66d9ef', '#a6e22e', '#f92672'],
	},
	catppuccin: {
		id: 'catppuccin',
		label: 'Catppuccin',
		mode: 'dark',
		aceTheme: 'tomorrow_night',
		swatch: ['#89b4fa', '#a6e3a1', '#f38ba8'],
	},
	solarized: {
		id: 'solarized',
		label: 'Solarized',
		mode: 'dark',
		aceTheme: 'solarized_dark',
		swatch: ['#268bd2', '#859900', '#dc322f'],
	},
	github: {
		id: 'github',
		label: 'GitHub',
		mode: 'light',
		aceTheme: 'github',
		swatch: ['#0969da', '#1a7f37', '#cf222e'],
	},
};

export const THEME_IDS = Object.keys(THEMES) as ThemeId[];

export const DEFAULT_THEME: ThemeId = 'midnight';

/** @deprecated Use ThemeId */
export type Theme = ThemeId;

export type ThemeContextValue = {
	theme: ThemeId;
	setTheme: (theme: ThemeId) => void;
	themeDefinition: ThemeDefinition;
};

const STORAGE_KEY = 'theme';

export const ThemeContext = createContext<ThemeContextValue | null>(null);

function isThemeId(value: string): value is ThemeId {
	return value in THEMES;
}

export function resolveThemeId(stored: string | null): ThemeId {
	if (stored === 'dark') return 'midnight';
	if (stored === 'light') return 'paper';
	if (stored && isThemeId(stored)) return stored;
	return DEFAULT_THEME;
}

export function getStoredTheme(): ThemeId {
	try {
		return resolveThemeId(localStorage.getItem(STORAGE_KEY));
	} catch {
		return DEFAULT_THEME;
	}
}

export function applyTheme(theme: ThemeId) {
	const root = document.documentElement;
	const definition = THEMES[theme];
	root.setAttribute('data-theme', theme);
	if (definition.mode === 'dark') {
		root.classList.add('dark');
		root.style.colorScheme = 'dark';
	} else {
		root.classList.remove('dark');
		root.style.colorScheme = 'light';
	}
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<ThemeId>(() => getStoredTheme());

	useEffect(() => {
		applyTheme(theme);
		try {
			localStorage.setItem(STORAGE_KEY, theme);
		} catch {
			// ignore
		}
	}, [theme]);

	const setTheme = useCallback((next: ThemeId) => {
		if (!isThemeId(next)) return;
		setThemeState(next);
	}, []);

	const value = useMemo(
		() => ({
			theme,
			setTheme,
			themeDefinition: THEMES[theme],
		}),
		[theme, setTheme]
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export function useTheme(): ThemeContextValue {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
}
