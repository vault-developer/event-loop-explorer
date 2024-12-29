import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			src: path.resolve(__dirname, './src'),
			components: path.resolve(__dirname, './src/components'),
			pages: path.resolve(__dirname, './src/pages'),
			providers: path.resolve(__dirname, './src/providers'),
			store: path.resolve(__dirname, './src/store'),
			utils: path.resolve(__dirname, './src/utils'),
		},
	},
	plugins: [react()],
	base: '/event-loop-explorer/',
});
