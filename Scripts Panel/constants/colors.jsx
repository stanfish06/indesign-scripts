const colors = {
  lightGray: [0, 0, 0, 50],
  red: [0, 100, 100, 0],
  green: [100, 0, 100, 0],
  blue: [100, 100, 0, 0],
  coolGray: [0, 0, 0, 20],
  black: [0, 0, 0, 100],
  matlabBlue: [100, 39.68, 0, 25.88],
  matlabOrange: [0, 61.75, 88.48, 14.9],
  matlabYellow: [0, 25.32, 86.5, 7.06],
  matlabPurple: [11.27, 66.9, 0, 44.31],
  matlabGreen: [30.81, 0, 72.09, 32.55],
  matlabCyan: [67.65, 20.17, 0, 6.67],
  matlabDarkRed: [0, 87.65, 70.99, 36.47],
  blockc_511: [0., 100., 100., 71.43],
  blockc_512: [0., 100., 91.89, 41.27],
  blockc_513: [0., 71.15, 84.62, 17.46],
  blockc_514: [0., 46.67, 75., 4.76],
  blockc_515: [0., 20.97, 61.29, 1.59],
  blockc_521: [93.33, 86.67, 0., 52.38],
  blockc_522: [89.29, 75., 0., 11.11],
  blockc_523: [80.65, 50., 0., 1.59],
  blockc_524: [68.25, 28.57, 0., 0.],
  blockc_525: [29.51, 9.84, 0., 3.17],
  blockc_531: [60., 0., 90., 84.13],
  blockc_532: [100., 0., 100., 65.08],
  blockc_533: [36.36, 0., 54.55, 47.62],
  blockc_534: [58.7, 0., 89.13, 26.98],
  blockc_535: [26.32, 0., 80.7, 9.52],
  blockc_541: [4.17, 87.5, 0., 61.9],
  blockc_542: [7.14, 100., 0., 33.33],
  blockc_543: [0., 68.52, 0., 14.29],
  blockc_544: [0., 42.86, 0., 0.],
  blockc_545: [0., 17.46, 3.17, 0.]
};

function defineColors(doc) {
  for (var colorName in colors) {
    var colorValue = colors[colorName];
    try {
      doc.colors.add({
        name: colorName,
        model: ColorModel.PROCESS,
        colorValue: colorValue,
      });
    } catch (e) {
      // Color may already exist; ignore error
    }
  }
}
