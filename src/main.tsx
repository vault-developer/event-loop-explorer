import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/nunito/latin.css';
import '@/styles/globals.css';
import '@/styles/typography.css';
import '@/styles/ace-editor.css';
import '@/styles/utilities.css';
import { ThemeProvider } from '@/theme';
import App from './App';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</StrictMode>
);
