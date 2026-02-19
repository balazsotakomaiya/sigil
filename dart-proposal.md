# Dart Package Proposal

## Short answer: stay in this monorepo

No separate repo needed. The JS packages already follow a clean `core → svg → react` layering, and Dart/Flutter maps to that perfectly as `core → svg → flutter`. Adding a `dart/` directory keeps everything co-located, avoids drift, and makes cross-platform parity testing straightforward.

---

## Proposed structure

```
sigil/
├── packages/           # existing JS packages (unchanged)
│   ├── core/
│   ├── svg/
│   └── react/
└── dart/               # new — Dart monorepo rooted here
    ├── melos.yaml      # Melos workspace config
    ├── packages/
    │   ├── sigil_core/     # pure Dart, pub.dev: sigil_core
    │   ├── sigil_svg/      # pure Dart SVG strings, pub.dev: sigil_svg
    │   └── sigil_flutter/  # Flutter widget, pub.dev: sigil_flutter
    └── .github/
        └── workflows/
            └── dart-ci.yml
```

Each Dart package mirrors its JS counterpart exactly:

| JS package        | Dart package      | Published as    |
|-------------------|-------------------|-----------------|
| `@sigil-ts/core`  | `sigil_core`      | `sigil_core`    |
| `@sigil-ts/gen`   | `sigil_svg`       | `sigil_svg`     |
| `@sigil-ts/react` | `sigil_flutter`   | `sigil_flutter` |

---

## Why Melos?

Melos is the standard Dart/Flutter monorepo tool (used by FlutterFire, VGV, etc.). It gives you:

- `melos bootstrap` — links local packages together (equivalent to `bun install` across workspaces)
- `melos run test` — runs `dart test` / `flutter test` across all packages
- `melos publish` — publishes to pub.dev in dependency order
- `melos version` — bumps versions (integrates with Conventional Commits if desired)

It lives in `dart/melos.yaml`; the Dart workspace is entirely self-contained within that directory.

---

## Package breakdown

### `sigil_core`

Pure Dart, zero Flutter dependency. Publishable as a plain Dart package — usable in CLI tools, server-side Dart, and Flutter alike.

**Implements:**
- `fnv1a(String input) → int` — FNV-1a hash
- `seeded(int hash, int index) → int` — seeded shuffler
- `extractInitials(String name) → String`
- All 8 style functions: `grainStyle`, `facesStyle`, `brutalistStyle`, `terminalStyle`, `pixelStyle`, `botsStyle`, `ghostsStyle`, `bloomStyle`
- All palettes
- The pixel-font bitmap
- All spec data classes (`GrainSpec`, `FacesSpec`, `AvatarSpec` sealed union, etc.)

**Key porting note — integer arithmetic:**

JS uses `Math.imul` for 32-bit multiplication and `>>> 0` unsigned shift. Dart `int` is 64-bit. Every multiplication in the hash must be masked:

```dart
// JS
hash = Math.imul(hash, FNV_PRIME) >>> 0;

// Dart equivalent
hash = (hash * _fnvPrime) & 0xFFFFFFFF;
```

All intermediate values must stay 32-bit to preserve deterministic parity with the JS output.

**Spec classes** are best modelled as Dart `final class` / sealed class hierarchy:

```dart
sealed class AvatarSpec { const AvatarSpec(); }
final class GrainSpec extends AvatarSpec {
  final String initials;
  final GrainPalette palette;
  final List<Blob> blobs;
  final double noiseFreq;
  final int noiseSeed;
  final int fontSize;
  const GrainSpec({...});
}
// ... other specs
```

**Dependencies:** none.

---

### `sigil_svg`

Pure Dart SVG string generator. No Flutter dependency — works in server-side Dart, CLI, web via `dart2js`.

**Implements:**
- `avatar(String name, {StyleId style, int size, BorderRadius borderRadius}) → String`
- One renderer per style under `lib/src/renderers/`

The SVG strings are identical to the JS output. This package enables:
- Server-side avatar generation
- Embedding in HTML emails
- Any non-Flutter context

**Dependencies:** `sigil_core`.

---

### `sigil_flutter`

Flutter widget that renders the SVG using [`flutter_svg`](https://pub.dev/packages/flutter_svg).

**Implements:**
- `Avatar` widget
- Props mirror the JS React component: `name`, `style`, `size`, `borderRadius`

```dart
Avatar(
  name: 'Alice',
  style: StyleId.grain,
  size: 80,
  borderRadius: BorderRadius.squircle,
)
```

Internally it calls `sigil_svg.avatar(name, ...)` and passes the resulting SVG string to `SvgPicture.string()`. The widget uses `const` constructors where possible and memoises the SVG string (equiv. to `useMemo` in the React package).

**Dependencies:** `sigil_svg`, `flutter_svg`.

---

## Testing strategy

Dart test files mirror the JS test files 1:1:

| JS test                         | Dart test                                     |
|---------------------------------|-----------------------------------------------|
| `core/test/hash.test.ts`        | `sigil_core/test/hash_test.dart`              |
| `core/test/initials.test.ts`    | `sigil_core/test/initials_test.dart`          |
| `core/test/styles.test.ts`      | `sigil_core/test/styles_test.dart`            |
| `svg/test/render.test.ts`       | `sigil_svg/test/render_test.dart`             |

**Cross-language parity test:** A dedicated test (or script) should run both the JS and Dart implementations on the same set of input names and compare SVG output character-for-character. This is the highest-confidence signal that the port is correct. It can live at `dart/test/parity_test.dart` and can be run in CI after both builds succeed.

---

## CI integration

Add `dart/.github/workflows/dart-ci.yml` (or a new job in the root `.github/workflows/ci.yml`):

```yaml
dart-ci:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: dart-lang/setup-dart@v1    # or subosito/flutter-action for flutter packages
    - run: dart pub global activate melos
    - run: melos bootstrap
      working-directory: dart
    - run: melos run lint
      working-directory: dart
    - run: melos run test
      working-directory: dart
```

For `sigil_flutter`, the job needs `subosito/flutter-action` instead of `dart-lang/setup-dart`.

---

## Publishing

Packages publish to [pub.dev](https://pub.dev), not npm.

**Recommended pub.dev names:** `sigil_core`, `sigil_svg`, `sigil_flutter`.

Version numbers should stay in sync with the JS packages (they share the same `scripts/version.ts` release philosophy). A `melos version` step can be wired into the existing root version script, or kept separate.

---

## What does NOT need to change in the existing JS code

Nothing. The Dart port lives entirely within `dart/` and is an independent workspace. The shared `AGENTS.md`, palettes, and style logic are the canonical reference — the Dart code is a faithful translation.

---

## Recommended implementation order

1. `sigil_core` — port hash, initials, palettes, all 8 style functions. Write tests. Verify parity with JS.
2. `sigil_svg` — port all 8 SVG renderers. Write render tests. Run parity check.
3. `sigil_flutter` — thin wrapper. Write widget smoke tests.
4. Wire up CI.
5. Publish to pub.dev once parity tests are green.
