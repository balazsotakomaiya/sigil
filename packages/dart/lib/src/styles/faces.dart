import '../hash.dart';
import '../initials.dart';
import '../palettes.dart';
import '../types.dart';

FacesSpec facesStyle(String name) {
  final initials = extractInitials(name);
  final h = fnv1a(name.trim().toLowerCase());

  final bg = faceBgs[h % faceBgs.length];
  final color = faceColors[seeded(h, 1) % faceColors.length];
  final accent = faceAccents[seeded(h, 2) % faceAccents.length];

  return FacesSpec(
    initials: initials,
    palette: FacesPalette(bg: bg, color: color, accent: accent),
    eyeSpacing: 13 + (seeded(h, 3) % 6),
    eyeY: 40 + (seeded(h, 4) % 6),
    eyeSize: 3 + (seeded(h, 5) % 3),
    eyeShape: seeded(h, 9) % 3,
    mouthStyle: seeded(h, 6) % 4,
    mouthY: 60 + (seeded(h, 11) % 5),
    hasBrows: seeded(h, 13) % 2 == 0,
    browOffset: seeded(h, 14) % 2 == 0 ? -2 : 1,
    noseStyle: seeded(h, 10) % 3,
    hasBlush: seeded(h, 7) % 3 == 0,
    hasFreckles: seeded(h, 12) % 4 == 0,
    headTilt: -4 + (seeded(h, 8) % 9),
  );
}
