import '../hash.dart';
import '../initials.dart';
import '../palettes.dart';
import '../types.dart';

BloomSpec bloomStyle(String name) {
  final initials = extractInitials(name);
  final h = fnv1a(name.trim().toLowerCase());
  final p = bloomPalettes[h % bloomPalettes.length];
  final orbs = p['orbs']! as List;

  final mainCx = 30 + (seeded(h, 1) % 40);
  final mainCy = 30 + (seeded(h, 2) % 40);
  final mainR = 32 + (seeded(h, 3) % 15);

  final sparkCx = (mainCx + 50) % 100;
  final sparkCy = (mainCy + 40) % 100;

  return BloomSpec(
    initials: initials,
    palette: BloomPalette(bg: p['bg']! as String, orb0: orbs[0] as String, orb1: orbs[1] as String),
    mainOrb: BloomOrb(cx: mainCx, cy: mainCy, r: mainR),
    sparkOrb: BloomSparkOrb(cx: sparkCx, cy: sparkCy),
    grainSeed: h % 500,
    fontSize: initials.length == 1 ? 36 : 30,
  );
}
