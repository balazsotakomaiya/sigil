// Spec types for all 8 avatar styles.
// Mirrors packages/core/src/types.ts using sealed classes (Dart 3+).

/// The border-radius shape applied to the avatar container.
enum BorderRadius { square, squircle, round }

/// All supported style identifiers.
enum StyleId { grain, faces, terminal, pixel, brutalist, bots, ghosts, bloom }

/// Request parameters for avatar generation.
class AvatarRequest {
  const AvatarRequest({required this.name, required this.style, this.size = 80});
  final String name;
  final StyleId style;
  final int size;
}

// ── Grain ──────────────────────────────────────────────────

class GrainBlob {
  const GrainBlob({
    required this.cx,
    required this.cy,
    required this.r,
    required this.opacity,
  });
  final num cx;
  final num cy;
  final num r;
  final double opacity;
}

class GrainPalette {
  const GrainPalette({required this.bg, required this.accent});
  final String bg;
  final String accent;
}

// ── Faces ──────────────────────────────────────────────────

class FacesPalette {
  const FacesPalette({required this.bg, required this.color, required this.accent});
  final String bg;
  final String color;
  final String accent;
}

// ── Terminal ───────────────────────────────────────────────

class TerminalPalette {
  const TerminalPalette({required this.bg, required this.fg, required this.dim});
  final String bg;
  final String fg;
  final String dim;
}

// ── Pixel ──────────────────────────────────────────────────

class PixelPalette {
  const PixelPalette({required this.bg, required this.fg, required this.hi});
  final String bg;
  final String fg;
  final String hi;
}

class BgPixel {
  const BgPixel({
    required this.x,
    required this.y,
    required this.size,
    required this.useHi,
    required this.opacity,
  });
  final num x;
  final num y;
  final num size;
  final bool useHi;
  final double opacity;
}

class LetterBitmap {
  const LetterBitmap({
    required this.bitmap,
    required this.startX,
    required this.startY,
    required this.cellSize,
  });
  final List<int> bitmap;
  final num startX;
  final num startY;
  final num cellSize;
}

// ── Bots ────────────────────────────────────────────────────

class BotsPalette {
  const BotsPalette({required this.bg, required this.body, required this.screen});
  final String bg;
  final String body;
  final String screen;
}

// ── Ghosts ───────────────────────────────────────────────────

class GhostsPalette {
  const GhostsPalette({required this.bg, required this.color, required this.cheek});
  final String bg;
  final String color;
  final String cheek;
}

class Sparkle {
  const Sparkle({required this.cx, required this.cy, required this.r});
  final num cx;
  final num cy;
  final num r;
}

// ── Bloom ────────────────────────────────────────────────────

class BloomPalette {
  const BloomPalette({required this.bg, required this.orb0, required this.orb1});
  final String bg;
  final String orb0;
  final String orb1;
}

class BloomOrb {
  const BloomOrb({required this.cx, required this.cy, required this.r});
  final num cx;
  final num cy;
  final num r;
}

class BloomSparkOrb {
  const BloomSparkOrb({required this.cx, required this.cy});
  final num cx;
  final num cy;
}

// ── Sealed spec hierarchy ──────────────────────────────────

sealed class AvatarSpec {
  const AvatarSpec({required this.initials});
  final String initials;
}

class GrainSpec extends AvatarSpec {
  const GrainSpec({
    required super.initials,
    required this.palette,
    required this.blobs,
    required this.noiseFreq,
    required this.noiseSeed,
    required this.fontSize,
  });
  final GrainPalette palette;
  final List<GrainBlob> blobs;
  final double noiseFreq;
  final int noiseSeed;
  final int fontSize;
}

class FacesSpec extends AvatarSpec {
  const FacesSpec({
    required super.initials,
    required this.palette,
    required this.eyeSpacing,
    required this.eyeY,
    required this.eyeSize,
    required this.eyeShape,
    required this.mouthStyle,
    required this.mouthY,
    required this.hasBrows,
    required this.browOffset,
    required this.noseStyle,
    required this.hasBlush,
    required this.hasFreckles,
    required this.headTilt,
  });
  final FacesPalette palette;
  final num eyeSpacing;
  final num eyeY;
  final num eyeSize;
  final int eyeShape; // 0=round, 1=oval, 2=line
  final int mouthStyle; // 0=smile, 1=open, 2=flat, 3=cat
  final num mouthY;
  final bool hasBrows;
  final int browOffset;
  final int noseStyle; // 0=dot, 1=line, 2=none
  final bool hasBlush;
  final bool hasFreckles;
  final int headTilt;
}

class TerminalSpec extends AvatarSpec {
  const TerminalSpec({
    required super.initials,
    required this.palette,
    required this.fontSize,
    required this.promptStyle,
    required this.topBar,
    required this.statusLine,
    required this.showCursor,
    required this.hashValue,
  });
  final TerminalPalette palette;
  final int fontSize;
  final int promptStyle; // 0='>', 1='$', 2='~', 3=none
  final int topBar; // 0=dots, 1=path, 2=none
  final int statusLine; // 0=pid bar, 1=line, 2=none
  final bool showCursor;
  final int hashValue;
}

class PixelSpec extends AvatarSpec {
  const PixelSpec({
    required super.initials,
    required this.palette,
    required this.bgPixels,
    required this.letterBitmaps,
  });
  final PixelPalette palette;
  final List<BgPixel> bgPixels;
  final List<LetterBitmap> letterBitmaps;
}

class BrutalistSpec extends AvatarSpec {
  const BrutalistSpec({
    required super.initials,
    required this.bg,
    required this.fg,
    required this.fontSize,
  });
  final String bg;
  final String fg;
  final int fontSize;
}

class BotsSpec extends AvatarSpec {
  const BotsSpec({
    required super.initials,
    required this.palette,
    required this.headShape,
    required this.headW,
    required this.headH,
    required this.visorType,
    required this.eyeType,
    required this.antennaType,
    required this.bodyW,
    required this.bodyH,
    required this.armType,
    required this.legType,
    required this.panelType,
  });
  final BotsPalette palette;
  final int headShape;
  final num headW;
  final num headH;
  final int visorType;
  final int eyeType;
  final int antennaType;
  final num bodyW;
  final num bodyH;
  final int armType;
  final int legType;
  final int panelType;
}

class GhostsSpec extends AvatarSpec {
  const GhostsSpec({
    required super.initials,
    required this.palette,
    required this.bodyW,
    required this.bodyTop,
    required this.bodyBottom,
    required this.numWaves,
    required this.waveAmp,
    required this.eyeType,
    required this.eyeY,
    required this.eyeSpacing,
    required this.mouthType,
    required this.mouthY,
    required this.hasBlush,
    required this.floatY,
    required this.tilt,
    required this.sparkles,
  });
  final GhostsPalette palette;
  final num bodyW;
  final num bodyTop;
  final num bodyBottom;
  final num numWaves;
  final num waveAmp;
  final int eyeType;
  final num eyeY;
  final num eyeSpacing;
  final int mouthType;
  final num mouthY;
  final bool hasBlush;
  final int floatY;
  final int tilt;
  final List<Sparkle> sparkles;
}

class BloomSpec extends AvatarSpec {
  const BloomSpec({
    required super.initials,
    required this.palette,
    required this.mainOrb,
    required this.sparkOrb,
    required this.grainSeed,
    required this.fontSize,
  });
  final BloomPalette palette;
  final BloomOrb mainOrb;
  final BloomSparkOrb sparkOrb;
  final int grainSeed;
  final int fontSize;
}
