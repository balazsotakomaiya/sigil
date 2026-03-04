import '../hash.dart';
import '../initials.dart';
import '../palettes.dart';
import '../types.dart';

GrainSpec grainStyle(String name) {
  final initials = extractInitials(name);
  final h = fnv1a(name.trim().toLowerCase());
  final p = grainPalettes[h % grainPalettes.length];

  return GrainSpec(
    initials: initials,
    palette: GrainPalette(bg: p['bg']!, accent: p['accent']!),
    blobs: [
      GrainBlob(
        cx: 25 + (seeded(h, 2) % 50),
        cy: 25 + (seeded(h, 3) % 50),
        r: 30 + (seeded(h, 4) % 25),
        opacity: 0.3,
      ),
      GrainBlob(
        cx: 10 + (seeded(h, 5) % 80),
        cy: 60 + (seeded(h, 6) % 30),
        r: 15 + (seeded(h, 7) % 20),
        opacity: 0.18,
      ),
    ],
    noiseFreq: 0.55 + (seeded(h, 1) % 30) / 100,
    noiseSeed: h % 999,
    fontSize: initials.length == 1 ? 56 : 46,
  );
}
