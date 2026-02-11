# Sigil

![Sigil Banner](.github/assets/banner.png)

Deterministic, beautiful avatar generation from any name. Five distinct visual styles — all derived purely from a hash of the input string. No random state, no external services, no images to host.

```
npm: sigil-core · sigil · sigil-react
```

## Styles

| Style | Preview | Description |
| --- | --- | --- |
| **Grain** | <img src=".github/assets/example-grain-01.svg" width="48"> <img src=".github/assets/example-grain-02.svg" width="48"> <img src=".github/assets/example-grain-03.svg" width="48"> | Film-grain texture via SVG noise, earthy palettes |
| **Faces** | <img src=".github/assets/example-faces-01.svg" width="48"> <img src=".github/assets/example-faces-02.svg" width="48"> <img src=".github/assets/example-faces-03.svg" width="48"> | Generative abstract faces — eyes, brows, nose, mouth |
| **Terminal** | <img src=".github/assets/example-terminal-01.svg" width="48"> <img src=".github/assets/example-terminal-02.svg" width="48"> <img src=".github/assets/example-terminal-03.svg" width="48"> | CRT scanlines, phosphor glow, monospace prompts |
| **Pixel** | <img src=".github/assets/example-pixel-01.svg" width="48"> <img src=".github/assets/example-pixel-02.svg" width="48"> <img src=".github/assets/example-pixel-03.svg" width="48"> | Custom 5×5 pixel font, retro gaming palettes |
| **Brutalist** | <img src=".github/assets/example-brutalist-01.svg" width="48"> <img src=".github/assets/example-brutalist-02.svg" width="48"> <img src=".github/assets/example-brutalist-03.svg" width="48"> | Knockout stencil — initials punched through color |

## Quick Start

### SVG string (universal JS)

```bash
bun add sigil
```

```typescript
import { avatar } from 'sigil';

const svg = avatar('Balazs Otakomaiya', { style: 'grain', size: 80 });
// → SVG string ready to inject into DOM or save to file
```

### React component

```bash
bun add sigil-react
```

```tsx
import { Avatar } from 'sigil-react';

<Avatar name="Balazs Otakomaiya" style="terminal" size={48} />
```

### Core only (build your own renderer)

```bash
bun add sigil-core
```

```typescript
import { resolve, grainStyle } from 'sigil-core';

// Use the registry
const spec = resolve('Alice Chen', 'grain');

// Or import individual styles for tree-shaking
const spec2 = grainStyle('Alice Chen');
```

**Core is the source of truth.** Each style is a pure function: `(name: string) → StyleSpec`. The spec is a platform-agnostic description of what to draw. Renderers (SVG, future Flutter) are thin translation layers.

## API

### `avatar(name, options?)`

Main entry point from `sigil`.

| Param           | Type      | Default   | Description                                                |
| --------------- | --------- | --------- | ---------------------------------------------------------- |
| `name`          | `string`  | —         | Name to generate avatar for                                |
| `options.style` | `StyleId` | `'grain'` | One of: `grain`, `faces`, `terminal`, `pixel`, `brutalist` |
| `options.size`  | `number`  | `80`      | Output size in pixels                                      |

Returns an SVG string.

### `<Avatar />` (React)

| Prop        | Type      | Default   | Description                    |
| ----------- | --------- | --------- | ------------------------------ |
| `name`      | `string`  | —         | Name to generate avatar for    |
| `style`     | `StyleId` | `'grain'` | Avatar style                   |
| `size`      | `number`  | `80`      | Size in pixels                 |
| `className` | `string`  | —         | CSS class for the wrapper span |

## Development

```bash
# Install dependencies
bun install

# Run all tests
bun run test

# Run gallery dev server
cd examples/gallery && bun run dev

# Lint
bun run lint
```

### Monorepo structure

```
sigil/
├── packages/
│   ├── core/          # Platform-agnostic logic (TypeScript)
│   ├── svg/           # SVG string renderer
│   └── react/         # React component
├── site/              # Landing page (Vite + React)
├── examples/
│   └── gallery/       # Interactive gallery (Bun server)
├── biome.json
└── tsconfig.base.json
```

### Adding a new style

1. Define the spec interface in `packages/core/src/types.ts`
2. Add palettes to `packages/core/src/palettes.ts`
3. Create `packages/core/src/styles/newstyle.ts` — pure function returning the spec
4. Register in `packages/core/src/styles/index.ts`
5. Create `packages/svg/src/renderers/newstyle.ts` — SVG string builder
6. Add to gallery
7. Write tests

## License

MIT
