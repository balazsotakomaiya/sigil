export 'bloom.dart';
export 'bots.dart';
export 'brutalist.dart';
export 'faces.dart';
export 'ghosts.dart';
export 'grain.dart';
export 'pixel.dart';
export 'terminal.dart';

import '../types.dart';
import 'bloom.dart';
import 'bots.dart';
import 'brutalist.dart';
import 'faces.dart';
import 'ghosts.dart';
import 'grain.dart';
import 'pixel.dart';
import 'terminal.dart';

/// Resolve a [name] and [style] into an [AvatarSpec].
AvatarSpec resolve(String name, StyleId style) {
  return switch (style) {
    StyleId.grain => grainStyle(name),
    StyleId.faces => facesStyle(name),
    StyleId.terminal => terminalStyle(name),
    StyleId.pixel => pixelStyle(name),
    StyleId.brutalist => brutalistStyle(name),
    StyleId.bots => botsStyle(name),
    StyleId.ghosts => ghostsStyle(name),
    StyleId.bloom => bloomStyle(name),
  };
}
