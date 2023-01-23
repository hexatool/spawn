<h1 align="center">
  Hexatool's spawn
</h1>

<p align="center">
  Take care of your <code>spawn()</code>
</p>

## Installation

```bash
npm install --save-dev @hexatool/spawn
```

**Using yarn**

```bash
yarn add @hexatool/spawn -dev
```

## What it does

- Returns an await-able promise
- Collects stdout and stderr buffers
- Emits `stdout` and `stderr` events
- Exposes al methods of `NodeJS.EventEmitter`
- Automatically kills all spawn processes when parent process dies

## How to use

```typescript
import spawn from '@hexatool/spawn';

async function main() {
   const child = spawn('npm', ['install', '@hexatool/spawn']);
   
   child.on('stdout', data => console.log(data.toString()));
   child.on('stderr', data => console.error(data.toString()));
   
   let { code, stdout, stderr } = await child;
   
   console.log(code === 0 ? 'success' : 'error');
}
```

## Hexatool Code Quality Standards

Publishing this package we are committing ourselves to the following code quality standards:

- Respect **Semantic Versioning**: No breaking changes in patch or minor versions
- No surprises in transitive dependencies: Use the **bare minimum dependencies** needed to meet the purpose
- **One specific purpose** to meet without having to carry a bunch of unnecessary other utilities
- **Tests** as documentation and usage examples
- **Well documented ReadMe** showing how to install and use
- **License favoring Open Source** and collaboration
