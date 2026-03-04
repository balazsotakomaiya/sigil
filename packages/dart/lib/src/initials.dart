// Mirrors packages/core/src/initials.ts exactly.

/// Extract up to two initials from [name].
///
/// - Empty / whitespace-only → `'?'`
/// - Single word → first letter uppercased
/// - Multiple words → first letter of first + first letter of last word, uppercased
String extractInitials(String name) {
  final trimmed = name.trim();
  if (trimmed.isEmpty) return '?';

  final parts = trimmed.split(RegExp(r'\s+')).where((s) => s.isNotEmpty).toList();

  if (parts.length == 1) {
    return parts[0][0].toUpperCase();
  }

  return (parts.first[0] + parts.last[0]).toUpperCase();
}
