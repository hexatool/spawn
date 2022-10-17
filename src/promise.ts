import type { Buffer } from 'node:buffer';
import EventEmitter from 'node:events';

export type SpawnResult = {
	code?: number | null;
	stdout: Buffer;
	stderr: Buffer;
};

type EventNames = 'stderr' | 'stdout';

type Resolve<T> = (value: Promise<T> | T) => void;
type Reject = (reason?: any) => void;
type Executor<T> = (resolve: Resolve<T>, reject: Reject, event: EventEmitter) => void;

export default class ChildProcessPromise extends Promise<SpawnResult> {
	private readonly ee: EventEmitter;

	constructor(executor: Executor<SpawnResult>) {
		let rej: Reject | undefined = undefined;
		let res: Resolve<SpawnResult> | undefined = undefined;
		super((resolve, reject) => {
			rej = reject;
			res = resolve;
		});
		this.ee = new EventEmitter();
		if (res && rej) executor(res, rej, this.ee);
	}

	addListener(event: EventNames, listener: (...args: any[]) => void): ChildProcessPromise {
		this.ee.addListener(event, listener);
		return this;
	}

	eventNames(): Array<string | symbol> {
		return this.ee.eventNames();
	}

	getMaxListeners(): number {
		return this.ee.getMaxListeners();
	}

	listenerCount(event: EventNames): number {
		return this.ee.listenerCount(event);
	}

	listeners(event: EventNames): Function[] {
		return this.ee.listeners(event);
	}

	off(event: EventNames, listener: (...args: any[]) => void): ChildProcessPromise {
		this.ee.off(event, listener);
		return this;
	}

	on(event: EventNames, listener: (...args: any[]) => void): ChildProcessPromise {
		this.ee.on(event, listener);
		return this;
	}

	once(event: EventNames, listener: (...args: any[]) => void): ChildProcessPromise {
		this.ee.once(event, listener);
		return this;
	}

	prependListener(event: EventNames, listener: (...args: any[]) => void): ChildProcessPromise {
		this.ee.prependListener(event, listener);
		return this;
	}

	prependOnceListener(event: EventNames, listener: (...args: any[]) => void): ChildProcessPromise {
		this.ee.prependOnceListener(event, listener);
		return this;
	}

	rawListeners(event: EventNames): Function[] {
		return this.ee.rawListeners(event);
	}

	removeAllListeners(event: EventNames): ChildProcessPromise {
		this.ee.removeAllListeners(event);
		return this;
	}

	removeListener(event: EventNames, listener: (...args: any[]) => void): ChildProcessPromise {
		this.ee.removeListener(event, listener);
		return this;
	}

	setMaxListeners(max: number): ChildProcessPromise {
		this.ee.setMaxListeners(max);
		return this;
	}
}
