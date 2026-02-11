# sigil

SVG string renderers for Sigil avatars. The main `avatar()` entry point lives here.

## Usage

```typescript
import { avatar } from 'sigil';

const svg = avatar('Alice Chen', { style: 'grain', size: 80 });
// → SVG string ready for DOM injection or file output
```

## API

### `avatar(name, options?)`

| Param           | Type      | Default   | Description              |
| --------------- | --------- | --------- | ------------------------ |
| `name`          | `string`  | —         | Name to generate for     |
| `options.style` | `StyleId` | `'grain'` | Style variant            |
| `options.size`  | `number`  | `80`      | Output size in pixels    |

### Individual renderers

```typescript
import { renderGrain, renderFaces, renderTerminal, renderPixel, renderBrutalist } from 'sigil';
```

Each renderer takes `(spec, size)` and returns an SVG string.

## Build

```bash
bun run build
bun test
```
