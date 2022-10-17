module.exports = {
	extends: ['@hexatool/eslint-config-typescript'],
	overrides: [
		{
			files: ['*.ts', '*.tsx'], // Your TypeScript files extension

			parserOptions: {
				project: ['./tsconfig.json'], // Specify it only for TypeScript files
			},
		},
	],
};
