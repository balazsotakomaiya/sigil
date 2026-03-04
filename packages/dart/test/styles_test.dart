import 'package:sigil/src/styles/styles.dart';
import 'package:sigil/src/types.dart';
import 'package:test/test.dart';

void main() {
  const names = ['Alice Chen', 'Bob M', 'Fatima', 'George Tanaka', 'X'];

  group('grainStyle', () {
    test('returns GrainSpec with correct shape', () {
      for (final name in names) {
        final spec = grainStyle(name);
        expect(spec, isA<GrainSpec>());
        expect(spec.initials, isNotEmpty);
        expect(spec.palette.bg, startsWith('#'));
        expect(spec.palette.accent, startsWith('#'));
        expect(spec.blobs.length, equals(2));
        expect(spec.fontSize, greaterThan(0));
        expect(spec.noiseFreq, greaterThan(0));
        expect(spec.noiseSeed, greaterThanOrEqualTo(0));
      }
    });
  });

  group('facesStyle', () {
    test('returns FacesSpec with correct shape', () {
      for (final name in names) {
        final spec = facesStyle(name);
        expect(spec, isA<FacesSpec>());
        expect(spec.eyeSpacing, greaterThanOrEqualTo(13));
        expect(spec.eyeShape, greaterThanOrEqualTo(0));
        expect(spec.eyeShape, lessThan(3));
        expect(spec.mouthStyle, greaterThanOrEqualTo(0));
        expect(spec.mouthStyle, lessThan(4));
        expect(spec.palette.bg, startsWith('#'));
        expect(spec.palette.color, startsWith('#'));
        expect(spec.palette.accent, startsWith('#'));
      }
    });
  });

  group('brutalistStyle', () {
    test('returns BrutalistSpec with correct shape', () {
      for (final name in names) {
        final spec = brutalistStyle(name);
        expect(spec, isA<BrutalistSpec>());
        expect(spec.bg, startsWith('#'));
        expect(spec.fg, startsWith('#'));
        expect(spec.fontSize, greaterThan(0));
      }
    });
  });

  group('terminalStyle', () {
    test('returns TerminalSpec with correct shape', () {
      for (final name in names) {
        final spec = terminalStyle(name);
        expect(spec, isA<TerminalSpec>());
        expect(spec.palette.bg, startsWith('#'));
        expect(spec.palette.fg, startsWith('#'));
        expect(spec.palette.dim, startsWith('#'));
        expect(spec.promptStyle, greaterThanOrEqualTo(0));
        expect(spec.promptStyle, lessThan(4));
      }
    });
  });

  group('pixelStyle', () {
    test('returns PixelSpec with correct shape', () {
      for (final name in names) {
        final spec = pixelStyle(name);
        expect(spec, isA<PixelSpec>());
        expect(spec.bgPixels.length, equals(12));
        expect(spec.letterBitmaps.length, greaterThanOrEqualTo(1));
        expect(spec.palette.bg, startsWith('#'));
        expect(spec.palette.fg, startsWith('#'));
        expect(spec.palette.hi, startsWith('#'));
      }
    });
  });

  group('botsStyle', () {
    test('returns BotsSpec with correct shape', () {
      for (final name in names) {
        final spec = botsStyle(name);
        expect(spec, isA<BotsSpec>());
        expect(spec.palette.bg, startsWith('#'));
        expect(spec.palette.body, startsWith('#'));
        expect(spec.palette.screen, startsWith('#'));
        expect(spec.headW, greaterThanOrEqualTo(28));
        expect(spec.headH, greaterThanOrEqualTo(22));
      }
    });
  });

  group('ghostsStyle', () {
    test('returns GhostsSpec with correct shape', () {
      for (final name in names) {
        final spec = ghostsStyle(name);
        expect(spec, isA<GhostsSpec>());
        expect(spec.palette.bg, startsWith('#'));
        expect(spec.palette.color, startsWith('#'));
        expect(spec.sparkles.length, greaterThanOrEqualTo(2));
      }
    });
  });

  group('bloomStyle', () {
    test('returns BloomSpec with correct shape', () {
      for (final name in names) {
        final spec = bloomStyle(name);
        expect(spec, isA<BloomSpec>());
        expect(spec.palette.bg, startsWith('#'));
        expect(spec.palette.orb0, startsWith('#'));
        expect(spec.palette.orb1, startsWith('#'));
        expect(spec.fontSize, greaterThan(0));
      }
    });
  });

  group('resolve', () {
    test('dispatches to correct style', () {
      expect(resolve('Alice', StyleId.grain), isA<GrainSpec>());
      expect(resolve('Alice', StyleId.faces), isA<FacesSpec>());
      expect(resolve('Alice', StyleId.brutalist), isA<BrutalistSpec>());
      expect(resolve('Alice', StyleId.terminal), isA<TerminalSpec>());
      expect(resolve('Alice', StyleId.pixel), isA<PixelSpec>());
      expect(resolve('Alice', StyleId.bots), isA<BotsSpec>());
      expect(resolve('Alice', StyleId.ghosts), isA<GhostsSpec>());
      expect(resolve('Alice', StyleId.bloom), isA<BloomSpec>());
    });
  });

  group('determinism', () {
    test('grainStyle is deterministic', () {
      final a1 = grainStyle('Alice Chen') as GrainSpec;
      final a2 = grainStyle('Alice Chen') as GrainSpec;
      expect(a1.initials, equals(a2.initials));
      expect(a1.palette.bg, equals(a2.palette.bg));
      expect(a1.noiseSeed, equals(a2.noiseSeed));
      expect(a1.noiseFreq, equals(a2.noiseFreq));
      expect(a1.fontSize, equals(a2.fontSize));
    });

    test('facesStyle is deterministic', () {
      final b1 = facesStyle('Bob') as FacesSpec;
      final b2 = facesStyle('Bob') as FacesSpec;
      expect(b1.eyeSpacing, equals(b2.eyeSpacing));
      expect(b1.eyeShape, equals(b2.eyeShape));
      expect(b1.mouthStyle, equals(b2.mouthStyle));
      expect(b1.hasBrows, equals(b2.hasBrows));
    });

    test('all styles are deterministic across all test names', () {
      for (final name in names) {
        for (final style in StyleId.values) {
          final s1 = resolve(name, style);
          final s2 = resolve(name, style);
          expect(s1.initials, equals(s2.initials),
              reason: '$style / $name initials mismatch');
        }
      }
    });
  });
}
