import { Buffer } from 'node:buffer';
import type { ChildProcess, SpawnOptions } from 'node:child_process';

import crossSpawn from 'cross-spawn';
import onExit from 'signal-exit';

import ChildProcessPromise from './promise';

const activeProcesses = new Set<ChildProcess>();

onExit(() => {
	for (const child of activeProcesses) {
		child.kill('SIGTERM');
	}
});

export default function spawn(
	cmd: string,
	args: string[] = [],
	opts?: SpawnOptions
): ChildProcessPromise {
	return new ChildProcessPromise((resolve, reject, events) => {
		const child = crossSpawn(cmd, args, opts);
		let stdout = Buffer.from('');
		let stderr = Buffer.from('');

		activeProcesses.add(child);

		if (child.stdout) {
			child.stdout.on('data', data => {
				stdout = Buffer.concat([stdout, data]);
				events.emit('stdout', data);
			});
		}

		if (child.stderr) {
			child.stderr.on('data', data => {
				stderr = Buffer.concat([stderr, data]);
				events.emit('stderr', data);
			});
		}

		child.on('error', err => {
			activeProcesses.delete(child);
			reject(err);
		});

		child.on('close', code => {
			activeProcesses.delete(child);
			resolve({ code, stdout, stderr });
		});
	});
}
