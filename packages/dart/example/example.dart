import 'dart:io';
import 'package:sigil/sigil.dart';

void main() {
  // Generate an avatar with the default grain style
  final svg = avatar('Alice Chen');
  print('Grain avatar (${svg.length} chars): ${svg.substring(0, 60)}...');

  // Generate avatars in all 8 styles and write them to files
  const names = ['Alice Chen', 'Bob Smith', 'Fatima'];

  for (final name in names) {
    for (final style in StyleId.values) {
      final output = avatar(name, style: style, size: 120);
      final safeName = name.replaceAll(' ', '_').toLowerCase();
      final filename = '${safeName}_${style.name}.svg';
      File(filename).writeAsStringSync(output);
    }
  }

  print('Generated ${names.length * StyleId.values.length} SVG files.');

  // Demonstrate determinism
  final a = avatar('Same Name');
  final b = avatar('Same Name');
  print('Deterministic: ${a == b}');
}
