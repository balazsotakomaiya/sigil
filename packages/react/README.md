# sigil-react

React component wrapper for Sigil avatars.

## Usage

```tsx
import { Avatar } from 'sigil-react';

<Avatar name="Alice Chen" style="grain" size={48} />
```

## Props

| Prop        | Type      | Default   | Description                    |
| ----------- | --------- | --------- | ------------------------------ |
| `name`      | `string`  | —         | Name to generate avatar for    |
| `style`     | `StyleId` | `'grain'` | Avatar style                   |
| `size`      | `number`  | `80`      | Size in pixels                 |
| `className` | `string`  | —         | CSS class for the wrapper span |

Requires `react >= 18` as a peer dependency.

## Build

```bash
bun run build
bun test
```
