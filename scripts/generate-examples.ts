import { avatar } from '../packages/svg/src/index';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const styles = [
	{ style: 'grain', name: 'Grain Example' },
	{ style: 'faces', name: 'Faces Demo' },
	{ style: 'terminal', name: 'Terminal Unit' },
	{ style: 'pixel', name: 'Pixel Avatar' },
	{ style: 'brutalist', name: 'Brutalist Style' },
] as const;

for (const { style, name } of styles) {
	const svg = avatar(name, { style, size: 256 });
	const filename = `example-${style}.svg`;
	writeFileSync(join('docs', filename), svg);
	console.log(`Created ${filename}`);
}
