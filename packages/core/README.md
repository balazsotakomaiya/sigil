# @sigil/core

Platform-agnostic logic for deterministic avatar generation. Hash functions, initial extraction, palette definitions, and style specs — all pure functions with zero external dependencies.

## Usage

```typescript
import { resolve, grainStyle } from '@sigil/core';

// Via the style registry
const spec = resolve('Alice Chen', 'grain');

// Direct import for tree-shaking
const spec2 = grainStyle('Alice Chen');
```

## What's inside

- **Hash** — FNV-1a + seeded derivation
- **Initials** — Extract 1–2 initials from any name string
- **Palettes** — Color definitions for all five styles
- **Styles** — Pure functions: `(name: string) → StyleSpec`

Styles: `grain`, `faces`, `terminal`, `pixel`, `brutalist`

## Build

```bash
bun run build   # ESM bundle + type declarations
bun test         # Run tests
```
