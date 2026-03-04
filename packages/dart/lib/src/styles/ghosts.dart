import '../hash.dart';
import '../initials.dart';
import '../palettes.dart';
import '../types.dart';

GhostsSpec ghostsStyle(String name) {
  final initials = extractInitials(name);
  final h = fnv1a(name.trim().toLowerCase());

  final bg = ghostBgs[h % ghostBgs.length];
  final color = ghostColors[seeded(h, 1) % ghostColors.length];
  final cheek = ghostCheeks[seeded(h, 1) % ghostCheeks.length];

  final bodyW = 28 + (seeded(h, 2) % 8);
  final bodyTop = 22 + (seeded(h, 3) % 6);
  final bodyBottom = 72 + (seeded(h, 4) % 6);
  final numWaves = 3 + (seeded(h, 5) % 3);
  final waveAmp = 4 + (seeded(h, 6) % 4);

  final eyeY = bodyTop + bodyW * 0.6 + 2;
  final eyeSpacing = 7 + (seeded(h, 8) % 4);
  final mouthY = eyeY + 8;

  final numSparkles = 2 + (seeded(h, 13) % 3);
  final sparkles = <Sparkle>[];
  for (int i = 0; i < numSparkles; i++) {
    sparkles.add(Sparkle(
      cx: 15 + (seeded(h, i + 30) % 70),
      cy: 15 + (seeded(h, i + 40) % 70),
      r: 1 + (seeded(h, i + 50) % 2),
    ));
  }

  return GhostsSpec(
    initials: initials,
    palette: GhostsPalette(bg: bg, color: color, cheek: cheek),
    bodyW: bodyW,
    bodyTop: bodyTop,
    bodyBottom: bodyBottom,
    numWaves: numWaves,
    waveAmp: waveAmp,
    eyeType: seeded(h, 7) % 5,
    eyeY: eyeY,
    eyeSpacing: eyeSpacing,
    mouthType: seeded(h, 9) % 4,
    mouthY: mouthY,
    hasBlush: seeded(h, 10) % 2 == 0,
    floatY: -3 + (seeded(h, 11) % 7),
    tilt: -3 + (seeded(h, 12) % 7),
    sparkles: sparkles,
  );
}
