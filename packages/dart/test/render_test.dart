import 'package:sigil/sigil.dart';
import 'package:test/test.dart';

void main() {
  const names = ['Alice Chen', 'Bob M', 'Fatima', 'George Tanaka', 'X'];

  group('avatar()', () {
    test('returns a non-empty SVG string', () {
      for (final name in names) {
        final svg = avatar(name);
        expect(svg, startsWith('<svg'));
        expect(svg, contains('</svg>'));
        expect(svg.length, greaterThan(100));
      }
    });

    test('is deterministic', () {
      for (final name in names) {
        expect(avatar(name), equals(avatar(name)));
      }
    });

    test('different names produce different SVGs', () {
      expect(avatar('Alice'), isNot(equals(avatar('Bob'))));
    });

    test('all 8 styles render without error', () {
      for (final style in StyleId.values) {
        for (final name in names) {
          final svg = avatar(name, style: style);
          expect(svg, startsWith('<svg'), reason: '$style / $name');
          expect(svg, contains('</svg>'), reason: '$style / $name');
        }
      }
    });

    test('size parameter is reflected in SVG', () {
      final svg120 = avatar('Alice', size: 120);
      expect(svg120, contains('width="120"'));
      expect(svg120, contains('height="120"'));
    });
  });

  group('renderSpec()', () {
    test('grain renders SVG with clip path and filter', () {
      final spec = resolve('Alice Chen', StyleId.grain) as GrainSpec;
      final svg = renderSpec(spec, 80);
      expect(svg, contains('feTurbulence'));
      expect(svg, contains('feBlend'));
      expect(svg, contains(spec.palette.bg));
      expect(svg, contains(spec.initials));
    });

    test('brutalist renders SVG with mask', () {
      final spec = resolve('Bob', StyleId.brutalist) as BrutalistSpec;
      final svg = renderSpec(spec, 80);
      expect(svg, contains('<mask'));
      expect(svg, contains(spec.initials));
    });

    test('pixel renders SVG with crispEdges', () {
      final spec = resolve('Alice', StyleId.pixel) as PixelSpec;
      final svg = renderSpec(spec, 80);
      expect(svg, contains('crispEdges'));
    });

    test('borderRadius square omits rx', () {
      final svg = avatar('Alice', borderRadius: BorderRadius.square);
      expect(svg, contains('rx="0"'));
    });

    test('borderRadius round produces rx="50"', () {
      final svg = avatar('Alice', borderRadius: BorderRadius.round);
      expect(svg, contains('rx="50"'));
    });
  });
}
