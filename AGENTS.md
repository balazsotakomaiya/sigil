# Sigil — Agent Context

## Overview

Sigil is a deterministic avatar generation library. Given any name string, it produces a unique, beautiful avatar. Five visual styles, zero runtime randomness — everything derives from an FNV-1a hash of the input.

## Tech Stack

- **Runtime**: Bun
- **Language**: TypeScript (strict)
- **Monorepo**: Bun workspaces (no pnpm, no turborepo)
- **Linting**: Biome (tabs, single quotes, semicolons)
- **Testing**: `bun:test`
- **Build**: `bun build` + `tsc --emitDeclarationOnly`

## Packages

| Package        | Path              | Purpose                                      |
| -------------- | ----------------- | -------------------------------------------- |
| `sigil-core`   | `packages/core/`  | Pure logic: hash, initials, palettes, styles |
| `sigil`        | `packages/svg/`   | SVG string renderers, `avatar()` entry point |
| `sigil-react`  | `packages/react/` | `<Avatar>` React component                  |

Dependency chain: `core` → `svg` → `react`. Core has zero external deps.

## Styles

Five styles: **grain**, **faces**, **brutalist**, **terminal**, **pixel**.

Each style is a pure function `(name: string) → StyleSpec` in `packages/core/src/styles/`. The spec is a platform-agnostic data structure. Renderers in `packages/svg/src/renderers/` translate specs into SVG strings.

## Key Architecture Decisions

- **Core is source of truth.** All style logic, palette definitions, and hash functions live in core. Renderers are thin translation layers.
- **`"bun"` export condition** in every package.json so Bun resolves `./src/index.ts` directly during development (no build step needed for dev/test).
- **Spec pattern:** Style functions return structured data, not strings. This enables future renderers (Flutter, Canvas) without duplicating logic.
- **Reference implementation:** `docs/example.html` is the canonical visual reference. The packaged code must produce identical output.

## File Conventions

- Style specs: `packages/core/src/styles/{stylename}.ts`
- SVG renderers: `packages/svg/src/renderers/{stylename}.ts`
- Palettes: all in `packages/core/src/palettes.ts`
- Types: all in `packages/core/src/types.ts`
- Tests: `packages/{pkg}/test/*.test.ts`

## Commands

```bash
bun install              # Install all workspace deps
bun test                 # Run all tests (from root)
bun run lint             # Biome check
bun run examples/gallery/server.ts  # Gallery dev server (port 3456)
```

## Adding a New Style

1. Add spec interface to `packages/core/src/types.ts`
2. Add `StyleId` union member
3. Add palettes to `packages/core/src/palettes.ts`
4. Create `packages/core/src/styles/{name}.ts`
5. Register in `packages/core/src/styles/index.ts`
6. Export from `packages/core/src/index.ts`
7. Create `packages/svg/src/renderers/{name}.ts`
8. Add case to `packages/svg/src/renderers/index.ts` switch
9. Write tests
10. Update gallery

## Docs

- `docs/plan.md` — Original tech spec and roadmap
- `docs/todo.md` — MVP task checklist with progress
