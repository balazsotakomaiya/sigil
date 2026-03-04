import '../types.dart';

String renderPixel(PixelSpec spec, int size, [BorderRadius? borderRadius]) {
  final palette = spec.palette;
  final brs = borderRadius == BorderRadius.square
      ? 's'
      : borderRadius == BorderRadius.round
          ? 'r'
          : 'q';
  final uid = 'px${spec.letterBitmaps[0].startX}${spec.bgPixels.length}$brs';
  final clipRx = borderRadius == BorderRadius.square
      ? 0
      : borderRadius == BorderRadius.round
          ? 50
          : 6;

  final bgBuf = StringBuffer();
  for (final p in spec.bgPixels) {
    final fill = p.useHi ? palette.hi : palette.fg;
    bgBuf.write(
        '<rect x="${p.x}" y="${p.y}" width="${p.size}" height="${p.size}" fill="$fill" opacity="${p.opacity}"/>');
  }

  final letterBuf = StringBuffer();
  for (final letter in spec.letterBitmaps) {
    final cellSize = letter.cellSize;
    for (int row = 0; row < 5; row++) {
      for (int col = 0; col < 5; col++) {
        if (letter.bitmap[row * 5 + col] != 0) {
          final rx = cellSize >= 10 ? 0.5 : 0.3;
          letterBuf.write('<rect x="${letter.startX + col * cellSize}" y="${letter.startY + row * cellSize}" '
              'width="$cellSize" height="$cellSize" fill="${palette.fg}" rx="$rx"/>');
        }
      }
    }
  }

  return '''<svg xmlns="http://www.w3.org/2000/svg" width="$size" height="$size" viewBox="0 0 100 100" shape-rendering="crispEdges">
  <defs>
    <clipPath id="${uid}_c"><rect width="100" height="100" rx="$clipRx" ry="$clipRx"/></clipPath>
  </defs>
  <g clip-path="url(#${uid}_c)">
    <rect width="100" height="100" fill="${palette.bg}"/>
    $bgBuf
    $letterBuf
  </g>
</svg>''';
}
