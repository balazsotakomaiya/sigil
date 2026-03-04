export 'bloom.dart';
export 'bots.dart';
export 'brutalist.dart';
export 'faces.dart';
export 'ghosts.dart';
export 'grain.dart';
export 'pixel.dart';
export 'terminal.dart';

import '../types.dart';
import '../styles/styles.dart';
import 'bloom.dart';
import 'bots.dart';
import 'brutalist.dart';
import 'faces.dart';
import 'ghosts.dart';
import 'grain.dart';
import 'pixel.dart';
import 'terminal.dart';

/// Render an [AvatarSpec] to an SVG string at the given [size] in pixels.
String renderSpec(AvatarSpec spec, int size, [BorderRadius? borderRadius]) {
  return switch (spec) {
    GrainSpec s => renderGrain(s, size, borderRadius),
    FacesSpec s => renderFaces(s, size, borderRadius),
    TerminalSpec s => renderTerminal(s, size, borderRadius),
    PixelSpec s => renderPixel(s, size, borderRadius),
    BrutalistSpec s => renderBrutalist(s, size, borderRadius),
    BotsSpec s => renderBots(s, size, borderRadius),
    GhostsSpec s => renderGhosts(s, size, borderRadius),
    BloomSpec s => renderBloom(s, size, borderRadius),
  };
}

/// Generate an SVG avatar string for [name].
///
/// [style] defaults to [StyleId.grain]. [size] defaults to 80.
String avatar(String name, {StyleId style = StyleId.grain, int size = 80, BorderRadius? borderRadius}) {
  final spec = resolve(name, style);
  return renderSpec(spec, size, borderRadius);
}
