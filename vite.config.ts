import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		target: "ESNext",
		lib: {
			formats: ["es"],
			fileName: (format) => `hexatool-spawn.${format === "es" ? "mjs" : "cjs"}`,
			entry: resolve(__dirname, 'src/index.ts'),
		},
		sourcemap: true,
		rollupOptions: {
			external: [
				"cross-spawn",
				"signal-exit",
				"node:buffer",
				"node:child_process",
				"node:events",
			],
			output: {
				exports: "named"
			}
		},
	},
	test: {
		coverage: {
			exclude: ['spec/**/*']
		}
	}
});
