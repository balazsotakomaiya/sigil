import '../hash.dart';
import '../initials.dart';
import '../palettes.dart';
import '../types.dart';

BrutalistSpec brutalistStyle(String name) {
  final initials = extractInitials(name);
  final h = fnv1a(name.trim().toLowerCase());
  final p = brutalistPalettes[h % brutalistPalettes.length];

  return BrutalistSpec(
    initials: initials,
    bg: p['bg']!,
    fg: p['fg']!,
    fontSize: initials.length == 1 ? 80 : 64,
  );
}
