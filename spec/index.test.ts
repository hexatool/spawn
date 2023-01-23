import { Buffer } from 'node:buffer';

import fixtures from '@hexatool/fixtures';
import { describe, expect, it, vi } from 'vitest';

import spawn from '../src';

const f = fixtures(__dirname, { root: __dirname });

describe('@hexatool/spawn', () => {
	it('argv', async () => {
		const file = f.find('argv.js');
		const { code, stdout, stderr } = await spawn('node', [file, 'foo', 'bar']);
		expect(code).toBe(0);
		expect(stdout).toStrictEqual(Buffer.from('foo bar'));
		expect(stderr).toStrictEqual(Buffer.from(''));
	});

	it('event: stdout', async () => {
		const file = f.find('stdout.js');
		const stderr = vi.fn();
		const child = spawn('node', [file])
			.on('stdout', data => {
				expect(data).toStrictEqual(Buffer.from('some stdout'));
			})
			.on('stderr', data => {
				stderr(data);
			});
		expect(stderr).not.toHaveBeenCalled();
		await child;
	});

	it('event: stderr', async () => {
		const file = f.find('stderr.js');
		const stdout = vi.fn();
		const child = spawn('node', [file])
			.on('stdout', data => {
				stdout(data);
			})
			.on('stderr', data => {
				expect(data).toStrictEqual(Buffer.from('some stderr'));
			});
		expect(stdout).not.toHaveBeenCalled();
		await child;
	});

	it('exit code 0', async () => {
		const file = f.find('exit0.js');
		const { code, stdout, stderr } = await spawn('node', [file]);
		expect(code).toBe(0);
		expect(stdout).toStrictEqual(Buffer.from('some stdout'));
		expect(stderr).toStrictEqual(Buffer.from('some stderr'));
	});

	it('exit code 1', async () => {
		const file = f.find('exit1.js');
		const { code, stdout, stderr } = await spawn('node', [file]);
		expect(code).toBe(1);
		expect(stdout).toStrictEqual(Buffer.from('some stdout'));
		expect(stderr).toStrictEqual(Buffer.from('some stderr'));
	});
});
