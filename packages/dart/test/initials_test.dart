import 'package:sigil/src/initials.dart';
import 'package:test/test.dart';

void main() {
  group('extractInitials', () {
    test('two-word name returns first + last initials', () {
      expect(extractInitials('Alice Chen'), equals('AC'));
      expect(extractInitials('Balazs Otakomaiya'), equals('BO'));
    });

    test('single name returns one initial', () {
      expect(extractInitials('Fatima'), equals('F'));
    });

    test('three-word name uses first + last', () {
      expect(extractInitials('George Michael Tanaka'), equals('GT'));
    });

    test('empty string returns ?', () {
      expect(extractInitials(''), equals('?'));
      expect(extractInitials('   '), equals('?'));
    });

    test('handles extra whitespace', () {
      expect(extractInitials('  Alice   Chen  '), equals('AC'));
    });

    test('returns uppercase', () {
      expect(extractInitials('alice chen'), equals('AC'));
    });

    test('single letter name', () {
      expect(extractInitials('a'), equals('A'));
    });
  });
}
