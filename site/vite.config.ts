import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
	base: process.env.CI ? '/sigil/' : '/',
	plugins: [react()],
	resolve: {
		alias: {
			'@sigil/core': path.resolve(__dirname, '../packages/core/src/index.ts'),
			'@sigil/svg': path.resolve(__dirname, '../packages/svg/src/index.ts'),
			'@sigil/react': path.resolve(__dirname, '../packages/react/src/index.ts'),
		},
	},
	server: {
		port: 3457,
	},
});
