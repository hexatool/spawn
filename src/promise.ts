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
type Listener = (...args: any[]) => void;

export default class ChildProcessPromise extends Promise<SpawnResult> {
	private readonly ee: EventEmitter;

	constructor(executor: Executor<SpawnResult>) {
		let rej: Reject | undefined;
		let res: Resolve<SpawnResult> | undefined;
		super((resolve, reject) => {
			rej = reject;
			res = resolve;
		});
		this.ee = new EventEmitter();
		if (res && rej) {
			executor(res, rej, this.ee);
		}
	}

	addListener(event: EventNames, listener: Listener): ChildProcessPromise {
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

	listeners(event: EventNames): Listener[] {
		return this.ee.listeners(event) as Listener[];
	}

	off(event: EventNames, listener: Listener): ChildProcessPromise {
		this.ee.off(event, listener);

		return this;
	}

	on(event: EventNames, listener: Listener): ChildProcessPromise {
		this.ee.on(event, listener);

		return this;
	}

	once(event: EventNames, listener: Listener): ChildProcessPromise {
		this.ee.once(event, listener);

		return this;
	}

	prependListener(event: EventNames, listener: Listener): ChildProcessPromise {
		this.ee.prependListener(event, listener);

		return this;
	}

	prependOnceListener(event: EventNames, listener: Listener): ChildProcessPromise {
		this.ee.prependOnceListener(event, listener);

		return this;
	}

	rawListeners(event: EventNames): Listener[] {
		return this.ee.rawListeners(event) as Listener[];
	}

	removeAllListeners(event: EventNames): ChildProcessPromise {
		this.ee.removeAllListeners(event);

		return this;
	}

	removeListener(event: EventNames, listener: Listener): ChildProcessPromise {
		this.ee.removeListener(event, listener);

		return this;
	}

	setMaxListeners(max: number): ChildProcessPromise {
		this.ee.setMaxListeners(max);

		return this;
	}
}
