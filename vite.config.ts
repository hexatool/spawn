import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

export default defineConfig({
	build: {
		target: 'ESNext',
		lib: {
			formats: ['es'],
			fileName: format => `hexatool-spawn.${format === 'es' ? 'mjs' : 'cjs'}`,
			entry: resolve(__dirname, 'src/index.ts'),
		},
		minify: false,
		sourcemap: false,
	},
	plugins: [dts({ rollupTypes: true }), externalizeDeps(), tsconfigPaths()],
	test: {
		coverage: {
			exclude: ['spec/**/*'],
		},
	},
});
