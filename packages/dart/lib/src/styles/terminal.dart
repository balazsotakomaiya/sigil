import '../hash.dart';
import '../initials.dart';
import '../palettes.dart';
import '../types.dart';

TerminalSpec terminalStyle(String name) {
  final initials = extractInitials(name);
  final h = fnv1a(name.trim().toLowerCase());
  final p = terminalPalettes[h % terminalPalettes.length];

  return TerminalSpec(
    initials: initials,
    palette: TerminalPalette(bg: p['bg']!, fg: p['fg']!, dim: p['dim']!),
    fontSize: initials.length == 1 ? 40 : 32,
    promptStyle: seeded(h, 1) % 4,
    topBar: seeded(h, 2) % 3,
    statusLine: seeded(h, 3) % 3,
    showCursor: seeded(h, 5) % 3 != 0,
    hashValue: h,
  );
}
