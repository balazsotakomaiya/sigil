#!/usr/bin/env bun

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const PACKAGES = [
	'packages/core/package.json',
	'packages/svg/package.json',
	'packages/react/package.json',
];

const ROOT = join(import.meta.dirname, '..');

function readPkg(rel: string) {
	const abs = join(ROOT, rel);
	return { abs, data: JSON.parse(readFileSync(abs, 'utf-8')) };
}

function writePkg(abs: string, data: Record<string, unknown>) {
	writeFileSync(abs, `${JSON.stringify(data, null, '\t')}\n`);
}

function run(cmd: string) {
	execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
}

function currentVersion(): string {
	const { data } = readPkg(PACKAGES[0]);
	return data.version;
}

function bumpVersion(current: string, type: 'major' | 'minor' | 'patch'): string {
	const [major, minor, patch] = current.split('.').map(Number);
	switch (type) {
		case 'major':
			return `${major + 1}.0.0`;
		case 'minor':
			return `${major}.${minor + 1}.0`;
		case 'patch':
			return `${major}.${minor}.${patch + 1}`;
	}
}

// --- CLI ---

const arg = process.argv[2];
const validTypes = ['major', 'minor', 'patch'] as const;
type BumpType = (typeof validTypes)[number];

let nextVersion: string;

if (!arg) {
	console.error(`Usage: bun run version <${validTypes.join('|')}|x.y.z>`);
	process.exit(1);
}

if (validTypes.includes(arg as BumpType)) {
	nextVersion = bumpVersion(currentVersion(), arg as BumpType);
} else if (/^\d+\.\d+\.\d+$/.test(arg)) {
	nextVersion = arg;
} else {
	console.error(`Invalid version: "${arg}". Use major, minor, patch, or an explicit x.y.z`);
	process.exit(1);
}

const current = currentVersion();
console.log(`\n  ${current} → ${nextVersion}\n`);

// Bump all package.json files
for (const rel of PACKAGES) {
	const { abs, data } = readPkg(rel);
	data.version = nextVersion;
	writePkg(abs, data);
	console.log(`  ✓ ${rel}`);
}

// Fix formatting with biome
console.log('\n  Fixing formatting with biome...');
run('bun run lint:fix');

// Stage, commit, tag
run(`git add ${PACKAGES.join(' ')}`);
run(`git commit -m "v${nextVersion}"`);
run(`git tag v${nextVersion}`);

console.log(`\n  Tagged v${nextVersion}`);
console.log('  Run `git push && git push --tags` to publish.\n');
console.log('  Then create a GitHub Release from the tag to trigger npm publish.\n');
