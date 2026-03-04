/// Sigil — deterministic SVG avatar generation.
///
/// Generate a unique, visually distinctive avatar from any name string:
///
/// ```dart
/// import 'package:sigil/sigil.dart';
///
/// final svg = avatar('Alice Chen');           // grain style, 80 px
/// final svg2 = avatar('Bob', style: StyleId.bloom, size: 120);
/// ```
///
/// The result is a self-contained SVG string ready to embed in HTML or save
/// to a file. The same name always produces the same output.
library sigil;

export 'src/types.dart';
export 'src/styles/styles.dart' show resolve;
export 'src/renderers/renderers.dart' show renderSpec, avatar;
