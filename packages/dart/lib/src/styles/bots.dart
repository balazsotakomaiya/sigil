import '../hash.dart';
import '../initials.dart';
import '../palettes.dart';
import '../types.dart';

BotsSpec botsStyle(String name) {
  final initials = extractInitials(name);
  final h = fnv1a(name.trim().toLowerCase());

  final bg = botBgs[h % botBgs.length];
  final body = botBodies[seeded(h, 1) % botBodies.length];
  final screen = botScreens[seeded(h, 1) % botScreens.length];

  return BotsSpec(
    initials: initials,
    palette: BotsPalette(bg: bg, body: body, screen: screen),
    headShape: seeded(h, 2) % 3,
    headW: 28 + (seeded(h, 3) % 8),
    headH: 22 + (seeded(h, 4) % 8),
    visorType: seeded(h, 5) % 4,
    eyeType: seeded(h, 6) % 5,
    antennaType: seeded(h, 7) % 4,
    bodyW: 24 + (seeded(h, 8) % 8),
    bodyH: 18 + (seeded(h, 9) % 6),
    armType: seeded(h, 10) % 4,
    legType: seeded(h, 11) % 4,
    panelType: seeded(h, 12) % 4,
  );
}
