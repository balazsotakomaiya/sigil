import '../types.dart';

String renderBots(BotsSpec spec, int size, [BorderRadius? borderRadius]) {
  final palette = spec.palette;
  final brs = borderRadius == BorderRadius.square
      ? 's'
      : borderRadius == BorderRadius.round
          ? 'r'
          : 'q';
  final uid = 'bt${spec.initials.toLowerCase()}${spec.headW}$brs';
  const headY = 20;
  final rx = borderRadius == BorderRadius.square
      ? 0
      : borderRadius == BorderRadius.round
          ? 50
          : 16;

  // Compute vertical bounds for centering
  double topY = headY.toDouble();
  if (spec.antennaType == 0) topY = headY - 12.5;
  else if (spec.antennaType == 1) topY = headY - 11.5;
  else if (spec.antennaType == 2) topY = headY - 12.0;

  final bYCalc = headY + spec.headH + 2;
  double bottomY = bYCalc + spec.bodyH;
  if (spec.legType == 0 || spec.legType == 2) bottomY = bYCalc + spec.bodyH + 8;
  else if (spec.legType == 1) bottomY = bYCalc + spec.bodyH + 6;

  final offsetY = (100 - (bottomY - topY)) / 2 - topY;

  // Head
  String head;
  if (spec.headShape == 0) {
    head = '<rect x="${50 - spec.headW / 2}" y="$headY" width="${spec.headW}" height="${spec.headH}" rx="4" fill="${palette.body}"/>';
  } else if (spec.headShape == 1) {
    head = '<rect x="${50 - spec.headW / 2}" y="$headY" width="${spec.headW}" height="${spec.headH}" rx="${spec.headH / 2}" fill="${palette.body}"/>';
  } else {
    head = '<rect x="${50 - spec.headW / 2}" y="$headY" width="${spec.headW}" height="${spec.headH}" rx="2" fill="${palette.body}"/>';
  }

  // Visor
  final visorY = headY + 5;
  String visor;
  if (spec.visorType == 0) {
    visor = '<rect x="${50 - spec.headW / 2 + 4}" y="$visorY" width="${spec.headW - 8}" height="${spec.headH - 10}" rx="2" fill="${palette.screen}"/>';
  } else if (spec.visorType == 1) {
    visor = '<rect x="${50 - spec.headW / 2 + 3}" y="$visorY" width="${spec.headW - 6}" height="${spec.headH - 12}" rx="${(spec.headH - 12) / 2}" fill="${palette.screen}"/>';
  } else if (spec.visorType == 2) {
    visor = '<circle cx="${50 - 6}" cy="${visorY + 4}" r="4" fill="${palette.screen}"/>'
        '<circle cx="${50 + 6}" cy="${visorY + 4}" r="4" fill="${palette.screen}"/>';
  } else {
    visor = '<rect x="${50 - spec.headW / 2 + 4}" y="$visorY" width="${spec.headW - 8}" height="4" rx="2" fill="${palette.screen}"/>';
  }

  // Eyes on visor
  final eY = visorY + (spec.visorType < 2 ? (spec.headH - 12) / 2 : 4);
  String eyes;
  if (spec.eyeType == 0) {
    eyes = '<rect x="${50 - 8}" y="${eY - 1}" width="4" height="4" rx="0.5" fill="${palette.body}"/>'
        '<rect x="${50 + 4}" y="${eY - 1}" width="4" height="4" rx="0.5" fill="${palette.body}"/>';
  } else if (spec.eyeType == 1) {
    eyes = '<circle cx="${50 - 6}" cy="${eY + 1}" r="2.5" fill="${palette.body}"/>'
        '<circle cx="${50 + 6}" cy="${eY + 1}" r="2.5" fill="${palette.body}"/>';
  } else if (spec.eyeType == 2) {
    eyes = '<line x1="${50 - 9}" y1="${eY + 1}" x2="${50 - 3}" y2="${eY + 1}" stroke="${palette.body}" stroke-width="2" stroke-linecap="round"/>'
        '<line x1="${50 + 3}" y1="${eY + 1}" x2="${50 + 9}" y2="${eY + 1}" stroke="${palette.body}" stroke-width="2" stroke-linecap="round"/>';
  } else if (spec.eyeType == 3) {
    eyes = '<polygon points="${50 - 6},${eY - 1} ${50 - 3},${eY + 3} ${50 - 9},${eY + 3}" fill="${palette.body}"/>'
        '<polygon points="${50 + 6},${eY - 1} ${50 + 9},${eY + 3} ${50 + 3},${eY + 3}" fill="${palette.body}"/>';
  } else {
    eyes = '<circle cx="${50 - 6}" cy="${eY + 1}" r="3" fill="${palette.body}" opacity="0.5"/>'
        '<circle cx="${50 - 6}" cy="${eY + 1}" r="1.5" fill="${palette.body}"/>'
        '<circle cx="${50 + 6}" cy="${eY + 1}" r="3" fill="${palette.body}" opacity="0.5"/>'
        '<circle cx="${50 + 6}" cy="${eY + 1}" r="1.5" fill="${palette.body}"/>';
  }

  // Antenna
  String antenna = '';
  if (spec.antennaType == 0) {
    antenna = '<line x1="50" y1="$headY" x2="50" y2="${headY - 8}" stroke="${palette.body}" stroke-width="1.5"/>'
        '<circle cx="50" cy="${headY - 10}" r="2.5" fill="${palette.body}"/>';
  } else if (spec.antennaType == 1) {
    antenna = '<line x1="50" y1="$headY" x2="45" y2="${headY - 10}" stroke="${palette.body}" stroke-width="1.5"/>'
        '<line x1="50" y1="$headY" x2="55" y2="${headY - 10}" stroke="${palette.body}" stroke-width="1.5"/>'
        '<circle cx="45" cy="${headY - 10}" r="1.5" fill="${palette.body}"/>'
        '<circle cx="55" cy="${headY - 10}" r="1.5" fill="${palette.body}"/>';
  } else if (spec.antennaType == 2) {
    antenna = '<polyline points="50,$headY 50,${headY - 6} 54,${headY - 10}" fill="none" stroke="${palette.body}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
        '<circle cx="54" cy="${headY - 10}" r="2" fill="${palette.body}"/>';
  }

  // Body
  final bY = headY + spec.headH + 2;
  final body =
      '<rect x="${50 - spec.bodyW / 2}" y="$bY" width="${spec.bodyW}" height="${spec.bodyH}" rx="3" fill="${palette.body}"/>';

  // Arms
  String arms = '';
  if (spec.armType == 0) {
    arms = '<rect x="${50 - spec.bodyW / 2 - 6}" y="${bY + 3}" width="5" height="${spec.bodyH - 6}" rx="2" fill="${palette.body}"/>'
        '<rect x="${50 + spec.bodyW / 2 + 1}" y="${bY + 3}" width="5" height="${spec.bodyH - 6}" rx="2" fill="${palette.body}"/>';
  } else if (spec.armType == 1) {
    arms = '<circle cx="${50 - spec.bodyW / 2 - 5}" cy="${bY + spec.bodyH / 2}" r="4" fill="${palette.body}"/>'
        '<circle cx="${50 + spec.bodyW / 2 + 5}" cy="${bY + spec.bodyH / 2}" r="4" fill="${palette.body}"/>';
  } else if (spec.armType == 2) {
    arms = '<rect x="${50 - spec.bodyW / 2 - 8}" y="${bY + 2}" width="7" height="4" rx="2" fill="${palette.body}"/>'
        '<rect x="${50 + spec.bodyW / 2 + 1}" y="${bY + 2}" width="7" height="4" rx="2" fill="${palette.body}"/>';
  }

  // Legs
  String legs = '';
  if (spec.legType == 0) {
    legs = '<rect x="${50 - 9}" y="${bY + spec.bodyH}" width="6" height="8" rx="1" fill="${palette.body}"/>'
        '<rect x="${50 + 3}" y="${bY + spec.bodyH}" width="6" height="8" rx="1" fill="${palette.body}"/>';
  } else if (spec.legType == 1) {
    legs = '<rect x="${50 - 7}" y="${bY + spec.bodyH}" width="4" height="6" rx="2" fill="${palette.body}"/>'
        '<rect x="${50 + 3}" y="${bY + spec.bodyH}" width="4" height="6" rx="2" fill="${palette.body}"/>';
  } else if (spec.legType == 2) {
    legs = '<circle cx="${50 - 6}" cy="${bY + spec.bodyH + 4}" r="4" fill="${palette.body}"/>'
        '<circle cx="${50 + 6}" cy="${bY + spec.bodyH + 4}" r="4" fill="${palette.body}"/>';
  }

  // Panel detail
  String panel = '';
  if (spec.panelType == 0) {
    panel = '<circle cx="${50 - spec.bodyW / 4}" cy="${bY + spec.bodyH / 2}" r="1.5" fill="${palette.screen}"/>'
        '<circle cx="${50 + spec.bodyW / 4}" cy="${bY + spec.bodyH / 2}" r="1.5" fill="${palette.screen}"/>';
  } else if (spec.panelType == 1) {
    panel = '<line x1="${50 - spec.bodyW / 3}" y1="${bY + spec.bodyH / 2}" x2="${50 + spec.bodyW / 3}" y2="${bY + spec.bodyH / 2}" stroke="${palette.screen}" stroke-width="1" stroke-linecap="round"/>';
  } else if (spec.panelType == 2) {
    panel = '<rect x="${50 - spec.bodyW / 4}" y="${bY + 3}" width="${spec.bodyW / 2}" height="3" rx="1" fill="${palette.screen}" opacity="0.5"/>'
        '<rect x="${50 - spec.bodyW / 4}" y="${bY + 8}" width="${spec.bodyW / 2}" height="2" rx="1" fill="${palette.screen}" opacity="0.3"/>';
  }

  return '''<svg xmlns="http://www.w3.org/2000/svg" width="$size" height="$size" viewBox="0 0 100 100">
  <defs><clipPath id="${uid}_c"><rect width="100" height="100" rx="$rx"/></clipPath></defs>
  <g clip-path="url(#${uid}_c)">
    <rect width="100" height="100" fill="${palette.bg}"/>
    <g transform="translate(0,${offsetY.toStringAsFixed(1)})">
    $antenna
    $head
    $visor
    $eyes
    $body
    $panel
    $arms
    $legs
    </g>
  </g></svg>''';
}
