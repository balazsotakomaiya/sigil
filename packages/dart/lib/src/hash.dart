// FNV-1a 32-bit hash and seeded derivation.
// Mirrors packages/core/src/hash.ts exactly.

const int _fnvOffset = 2166136261;
const int _fnvPrime = 16777619;

/// 32-bit integer multiply safe for both Dart native and dart2js.
///
/// JavaScript's `Math.imul` operates on 32-bit integers. On Dart native,
/// plain multiplication would overflow 32 bits silently, but since Dart uses
/// 64-bit integers we need an explicit mask. On dart2js (where ints are 53-bit
/// doubles) large products could lose precision, so we split into 16-bit halves.
int _imul(int a, int b) {
  a &= 0xFFFFFFFF;
  b &= 0xFFFFFFFF;
  final aLo = a & 0xFFFF;
  final aHi = a >>> 16;
  final bLo = b & 0xFFFF;
  final bHi = b >>> 16;
  // Keep only the bits that contribute to the low 32 bits of the product.
  return ((((aHi * bLo + aLo * bHi) & 0xFFFF) << 16) + aLo * bLo) & 0xFFFFFFFF;
}

/// FNV-1a 32-bit hash of [str]. Returns an unsigned 32-bit integer.
int fnv1a(String str) {
  int hash = _fnvOffset;
  for (int i = 0; i < str.length; i++) {
    hash = (hash ^ str.codeUnitAt(i)) & 0xFFFFFFFF;
    hash = _imul(hash, _fnvPrime);
  }
  return hash;
}

/// Derive a deterministic pseudo-random unsigned 32-bit integer from [hash]
/// and a seed [index]. Different indices produce different values, enabling
/// multiple independent random draws from a single hash.
int seeded(int hash, int index) {
  int h = (hash ^ ((index * 2654435761) & 0xFFFFFFFF)) & 0xFFFFFFFF;
  h = _imul(h ^ (h >>> 16), 2246822507);
  h = _imul(h ^ (h >>> 13), 3266489909);
  return (h ^ (h >>> 16)) & 0xFFFFFFFF;
}
