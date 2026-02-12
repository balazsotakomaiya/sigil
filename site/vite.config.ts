import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	base: '/',
	plugins: [react()],
	resolve: {
		alias: {
			'@sigil-ts/core': path.resolve(__dirname, '../packages/core/src/index.ts'),
			'@sigil-ts/gen': path.resolve(__dirname, '../packages/svg/src/index.ts'),
			'@sigil-ts/react': path.resolve(__dirname, '../packages/react/src/index.ts'),
		},
	},
	server: {
		port: 3457,
	},
});
