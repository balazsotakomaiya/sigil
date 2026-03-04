import '../hash.dart';
import '../initials.dart';
import '../palettes.dart';
import '../pixel_font.dart';
import '../types.dart';

PixelSpec pixelStyle(String name) {
  final initials = extractInitials(name);
  final h = fnv1a(name.trim().toLowerCase());
  final p = pixelPalettes[h % pixelPalettes.length];

  const pxSize = 10;
  final bgPixels = <BgPixel>[];
  for (int i = 0; i < 12; i++) {
    bgPixels.add(BgPixel(
      x: (seeded(h, i + 50) % 10) * pxSize,
      y: (seeded(h, i + 70) % 10) * pxSize,
      size: pxSize,
      useHi: seeded(h, i + 90) % 3 == 0,
      opacity: 0.08 + (seeded(h, i + 110) % 10) / 100,
    ));
  }

  final letterBitmaps = <LetterBitmap>[];
  if (initials.length == 1) {
    letterBitmaps.add(LetterBitmap(
      bitmap: pixelFont[initials] ?? pixelFont['?']!,
      startX: 25,
      startY: 25,
      cellSize: 10,
    ));
  } else {
    letterBitmaps.add(LetterBitmap(
      bitmap: pixelFont[initials[0]] ?? pixelFont['?']!,
      startX: 12,
      startY: 32,
      cellSize: 7,
    ));
    letterBitmaps.add(LetterBitmap(
      bitmap: pixelFont[initials[1]] ?? pixelFont['?']!,
      startX: 53,
      startY: 32,
      cellSize: 7,
    ));
  }

  return PixelSpec(
    initials: initials,
    palette: PixelPalette(bg: p['bg']!, fg: p['fg']!, hi: p['hi']!),
    bgPixels: bgPixels,
    letterBitmaps: letterBitmaps,
  );
}
