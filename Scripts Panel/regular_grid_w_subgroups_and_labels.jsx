const supTitleBarHeight = 30;
const supSideBarWidth = 0;
const titleBarHeight = 110;
const sideBarWidth = 0;
const subGridWidth = 300;
const subGridHeight = 400;
const margin = 10;
// margins for left, right, bottom, top
const gap = 20;
const subGridFrameWidth = 5;
const subGridOffset = 5;
var cropTop = 0; // Top crop
var cropBottom = 0; // Bottom crop
var cropLeft = 0; // Left crop
var cropRight = 0; // Right crop

const textGap = 20;
const sideBarFontSize = 20;
const titleFontSize = 30;
const titleFontColor = 'black';
const textBox = [80, 25];

colors = {
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
};

// arrange the subgrids
function subGrid(
  nrow,
  ncol,
  title,
  channelNames,
  channelColors,
  condition_list,
  folder_path,
  prefix,
  postfix,
  gridFrameColor,
  byRow,
  xlabel_type,
  xlabels,
  ylabel_type,
  ylabels,
  gridMargin
) {
  this.rightTop = null;
  this.rightBottom = null;
  this.bottomLeft = null;
  this.bottomRight = null;
  this.origin_x = 0;
  this.origin_y = 0;
  this.title = title;
  this.channelNames = channelNames;
  this.channelColors = channelColors;
  this.nrow = nrow;
  this.ncol = ncol;
  this.condition_list = condition_list;
  this.folder_path = folder_path;
  this.prefix = prefix;
  this.postfix = postfix;
  this.gridFrameColor = gridFrameColor;
  this.byRow = byRow;
  this.xlabel_type = xlabel_type
  this.xlabels = xlabels
  this.ylabel_type = ylabel_type
  this.ylabels = ylabels
  this.gridMargin = gridMargin
}

subGrid.prototype.setChildGrid = function (childGrid, position) {
  if (position == "rightTop") {
    this.rightTop = childGrid;
    childGrid.origin_x = this.origin_x + this.ncol * subGridWidth + (this.ncol - 1) * gap + gap + sideBarWidth + this.gridMargin[0] + this.gridMargin[1];
    childGrid.origin_y = this.origin_y;
  } else if (position == "rightBottom") {
    this.rightBottom = childGrid;
    childGrid.origin_x =
      this.origin_x + this.ncol * subGridWidth + (this.ncol - 1) * gap + gap + sideBarWidth + this.gridMargin[0] + this.gridMargin[1];
    childGrid.origin_y =
      this.origin_y + this.nrow * subGridHeight + (this.nrow - 1) * gap + gap + titleBarHeight + this.gridMargin[2] + this.gridMargin[3];
  } else if (position == "bottomLeft") {
    this.bottomLeft = childGrid;
    childGrid.origin_x = this.origin_x;
    childGrid.origin_y =
      this.origin_y + this.nrow * subGridHeight + (this.nrow - 1) * gap + gap + titleBarHeight + this.gridMargin[2] + this.gridMargin[3];
  } else if (position == "bottomRight") {
    this.bottomRight = childGrid;
    childGrid.origin_x =
      this.origin_x + this.ncol * subGridWidth + (this.ncol - 1) * gap - childGrid.ncol * subGridWidth - (childGrid.ncol - 1) * gap + this.gridMargin[0] + this.gridMargin[1];
    childGrid.origin_y =
      this.origin_y + this.nrow * subGridHeight + (this.nrow - 1) * gap + gap + titleBarHeight + this.gridMargin[2] + this.gridMargin[3];
  }
};

const gridList = [
  new subGrid(
    4,
    3,
    "NKO, PGC induction, adjust activin dose and timing",
    ["DAPI", "EOMES", "TFAP2C", "SOX17"],
    ["lightGray", "red", "green", "blue"],
    [
      'C6B50;B50;B50 (NKO)',
      "",
      "",
      "",
      "",
      'C6B50;B50A1;B50 (NKO)',
      'C6B50;B50;B50A1 (NKO)',
      'C6B50;B50A1;B50A1 (NKO)',
      "",
      'C6B50;B50A10;B50 (NKO)',
      'C6B50;B50;B50A10 (NKO)',
      "",
      "",
    ],
    "C:/Users/zhiyu/OneDrive - Umich/dump/2025-06-15/img2/mip_montage",
    "",
    "_merged.png",
    "matlabBlue",
    false,
    "dose",
    ["-", "A1", "A10"],
    "time",
    ["-", "day-1 A", "day-2 A", "day-1&2 A"],
    [80, 0, 0, 50]
  ),
  new subGrid(
    4,
    3,
    "PGP1, PGC induction, adjust activin dose and timing",
    ["DAPI", "EOMES", "TFAP2C", "SOX17"],
    ["lightGray", "red", "green", "blue"],
    [
      'C6B50;B50;B50 (PGP1)',
      "",
      "",
      "",
      "",
      'C6B50;B50A1;B50 (PGP1)',
      'C6B50;B50;B50A1 (PGP1)',
      'C6B50;B50A1;B50A1 (PGP1)',
      "",
      'C6B50;B50A10;B50 (PGP1)',
      'C6B50;B50;B50A10 (PGP1)',
      "",
    ],
    "C:/Users/zhiyu/OneDrive - Umich/dump/2025-06-15/img1/mip_montage",
    "",
    "_merged.png",
    "matlabOrange",
    false,
    "dose",
    ["-", "A1", "A10"],
    "time",
    ["-", "day-1 A", "day-2 A", "day-1&2 A"],
    [80, 0, 0, 50]
  ),
  new subGrid(
    4,
    3,
    "PGP1, PGC induction, adjust activin dose and timing, day-2 IWP2",
    ["DAPI", "EOMES", "TFAP2C", "SOX17"],
    ["lightGray", "red", "green", "blue"],
    [
      'C6B50;B50;B50+IWP2 (PGP1)',
      "",
      "",
      "",
      "",
      'C6B50;B50A1;B50+IWP2 (PGP1)',
      'C6B50;B50;B50A1+IWP2 (PGP1)',
      'C6B50;B50A1;B50A1+IWP2 (PGP1)',
      "",
      'C6B50;B50A10;B50+IWP2 (PGP1)',
      'C6B50;B50;B50A10+IWP2 (PGP1)',
      ""
    ],
    "C:/Users/zhiyu/OneDrive - Umich/dump/2025-06-15/img1/mip_montage",
    "",
    "_merged.png",
    "matlabGreen",
    false,
    "dose",
    ["-", "A1", "A10"],
    "time",
    ["-", "day-1 A", "day-2 A", "day-1&2 A"],
    [80, 0, 0, 50]
  ),
  new subGrid(
    2,
    3,
    "PGP1, endoderm induction, adjust activin dose and timing",
    ["DAPI", "EOMES", "TFAP2C", "SOX17"],
    ["lightGray", "red", "green", "blue"],
    [
      'C6B50;B50;A100+LDN (PGP1)',
      "",
      "",
      'C6B50;B50A1;A100+LDN (PGP1)',
      "",
      'C6B50;B50A10;A100+LDN (PGP1)',
    ],
    "C:/Users/zhiyu/OneDrive - Umich/dump/2025-06-15/img2/mip_montage",
    "",
    "_merged.png",
    "matlabDarkRed",
    false,
    "dose",
    ["-", "A1", "A10"],
    "time",
    ["-", "day-1 A"],
    [80, 0, 0, 50]
  ),
  new subGrid(
    1,
    1,
    "NKO, PGC induction (positive control)",
    ["DAPI", "EOMES", "TFAP2C", "SOX17"],
    ["lightGray", "red", "green", "blue"],
    [
      'C3A100;B50;B50 (NKO)',
    ],
    "C:/Users/zhiyu/OneDrive - Umich/dump/2025-06-15/img2/mip_montage",
    "",
    "_merged.png",
    "matlabBlue",
    false,
    "",
    ["-", "A1", "A10"],
    "",
    ["", "day-1 A"],
    [0, 0, 0, 0]
  ),
  new subGrid(
    1,
    2,
    "PGP1, PGC induction (positive control), 2 duplicates",
    ["DAPI", "EOMES", "TFAP2C", "SOX17"],
    ["lightGray", "red", "green", "blue"],
    [
      'img1/mip_montage/C3A100;B50;B50 (PGP1)',
      'img2/mip_montage/C3A100;B50;B50 (PGP1)',
    ],
    "C:/Users/zhiyu/OneDrive - Umich/dump/2025-06-15",
    "",
    "_merged.png",
    "matlabOrange",
    false,
    "",
    ["-", "A1", "A10"],
    "",
    ["", "day-1 A"],
    [0, 0, 0, 0]
  ),
  new subGrid(
    1,
    1,
    "PGP1, endoderm induction after regular PGC induction",
    ["DAPI", "EOMES", "TFAP2C", "SOX17"],
    ["lightGray", "red", "green", "blue"],
    [
      'C3A100;B50;A100+LDN (PGP1)',
    ],
    "C:/Users/zhiyu/OneDrive - Umich/dump/2025-06-15/img2/mip_montage",
    "",
    "_merged.png",
    "matlabDarkRed",
    false,
    "",
    ["-", "A1", "A10"],
    "",
    ["", "day-1 A"],
    [0, 0, 0, 0]
  ),
  new subGrid(
    2,
    1,
    "PGP1, endoderm induction, change treatment orders",
    ["DAPI", "EOMES", "TFAP2C", "SOX17"],
    ["lightGray", "red", "green", "blue"],
    [
      'img2/mip_montage/B50;C6B50;A100+LDN (PGP1)',
      'img2/mip_montage/B50;C6B50A1;A00+LDN (PGP1)',
      "",
      "",
    ],
    "C:/Users/zhiyu/OneDrive - Umich/dump/2025-06-15",
    "",
    "_merged.png",
    "matlabDarkRed",
    false,
    "",
    ["-", "A1", "A10"],
    "time",
    ["-", "day-1 A", "day-2 A", "day-1&2 A"],
    [80, 0, 0, 50]
  ),
  new subGrid(
    4,
    2,
    "PGP1/NKO, PGC induction, change treatment orders",
    ["DAPI", "EOMES", "TFAP2C", "SOX17"],
    ["lightGray", "red", "green", "blue"],
    [
      '/img2/mip_montage/B50;C6B50;B50 (NKO)',
      "",
      '/img2/mip_montage/B50;C6B50;B50A1 (NKO)',
      "",
      '/img1/mip_montage/B50;C6B50;B50 (PGP1)',
      "",
      '/img1/mip_montage/B50;C6B50;B50A1 (PGP1)',
      '/img1/mip_montage/B50;C6B50A1;B50A1 (PGP1)',
    ],
    "C:/Users/zhiyu/OneDrive - Umich/dump/2025-06-15",
    "",
    "_merged.png",
    "matlabPurple",
    false,
    "",
    ["-", "A1", "A10"],
    "time",
    ["-", "day-1 A", "day-2 A", "day-1&2 A"],
    [80, 0, 0, 50]
  ),
  new subGrid(
    4,
    1,
    "PGP1, PGC induction, day-2 IWP2, change treatment order",
    ["DAPI", "EOMES", "TFAP2C", "SOX17"],
    ["lightGray", "red", "green", "blue"],
    [
      'img1/mip_montage/B50;C6B50;B50+IWP2 (PGP1)',
      "",
      'img2/mip_montage/B50;C6B50;B50A1+IWP2 (PGP1)',
      'img2/mip_montage/B50;C6B50A1;B50A1+IWP2 (PGP1)',
    ],
    "C:/Users/zhiyu/OneDrive - Umich/dump/2025-06-15",
    "",
    "_merged.png",
    "matlabPurple",
    false,
    "",
    ["-", "A1", "A10"],
    "time",
    ["-", "day-1 A", "day-2 A", "day-1&2 A"],
    [80, 0, 0, 50]
  ),
  new subGrid(
    1,
    1,
    "PGP1, PGC induction, day-2 IWP2",
    ["DAPI", "EOMES", "TFAP2C", "SOX17"],
    ["lightGray", "red", "green", "blue"],
    [
      'img1/mip_montage/C3A100;B50;B50+IWP2 (PGP1)',
    ],
    "C:/Users/zhiyu/OneDrive - Umich/dump/2025-06-15",
    "",
    "_merged.png",
    "matlabGreen",
    false,
    "",
    ["-", "A1", "A10"],
    "",
    ["-", "day-1 A", "day-2 A", "day-1&2 A"],
    [0, 0, 0, 0]
  ),
  // new subGrid(
  //   1,
  //   2,
  //   "regular PGC induction with 3h preincubation and low density seeding",
  //   ["DAPI", "EOMES", "TFAP2C", "SOX17"],
  //   ["lightGray", "red", "green", "blue"],
  //   [
  //     '/exp-17-img1//C3A100;B50;B50',
  //     '/exp-17-img2//B50;B50;B50',
  //   ],
  //   "C:/Users/zhiyu/OneDrive - Umich/dump/2025-06-05",
  //   "",
  //   "_merged.png",
  //   "matlabBlue"
  // ),
];
gridList[0].setChildGrid(gridList[1], 'rightTop')
gridList[1].setChildGrid(gridList[2], 'rightTop')
gridList[2].setChildGrid(gridList[3], 'rightTop')
gridList[0].setChildGrid(gridList[4], 'bottomRight')
gridList[1].setChildGrid(gridList[5], 'bottomRight')
gridList[2].setChildGrid(gridList[6], 'bottomRight')
gridList[3].setChildGrid(gridList[7], 'rightTop')
gridList[7].setChildGrid(gridList[8], 'rightTop')
gridList[8].setChildGrid(gridList[9], 'rightTop')
gridList[2].setChildGrid(gridList[10], 'bottomLeft')
// gridList[3].setChildGrid(gridList[4], 'rightTop')
// gridList[4].setChildGrid(gridList[5], 'rightTop')

const rootGrid = 0;

function getPageSize(grid) {
  if (grid == null) {
    return [-gap + sideBarWidth, -gap];
  } else {
    const sz1 = getPageSize(grid.rightTop);
    const sz2 = getPageSize(grid.rightBottom);
    const sz3 = getPageSize(grid.bottomLeft);
    const sz4 = getPageSize(grid.bottomRight);

    const bd_width = Math.max(
      sz1[0] +
      gap +
      grid.ncol * subGridWidth +
      (grid.ncol - 1) * gap +
      sideBarWidth + grid.gridMargin[0] + grid.gridMargin[1],
      sz2[0] +
      gap +
      grid.ncol * subGridWidth +
      (grid.ncol - 1) * gap +
      sideBarWidth + grid.gridMargin[0] + grid.gridMargin[1],
      sz3[0] + sideBarWidth + grid.gridMargin[0] + grid.gridMargin[1]
    );
    const bd_height = Math.max(
      sz3[1] + gap + grid.nrow * subGridHeight + (grid.nrow - 1) * gap + titleBarHeight + grid.gridMargin[2] + grid.gridMargin[3],
      sz4[1] + gap + grid.nrow * subGridHeight + (grid.nrow - 1) * gap + titleBarHeight + grid.gridMargin[2] + grid.gridMargin[3],
      sz2[1] + titleBarHeight + grid.gridMargin[2] + grid.gridMargin[3],
    );
    return [bd_width, bd_height];
  }
}

const pageSize = getPageSize(gridList[rootGrid]);

var myFont = app.fonts.item("Arial");
var myDoc = app.documents.add();

// set measuremnet units to points
myDoc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;
myDoc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.points;
myDoc.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;

// set document preferences, no need for facing pages
myDoc.documentPreferences.facingPages = false;
myDoc.documentPreferences.pageHeight =
  pageSize[1] + 2 * margin + supTitleBarHeight;
myDoc.documentPreferences.pageWidth = pageSize[0] - sideBarWidth + 2 * margin + supSideBarWidth;

var myMasterSpread = myDoc.masterSpreads.item(0);
var myMarginPreferences = myMasterSpread.pages.item(0).marginPreferences;

//Now set up the page margins and columns.
myMarginPreferences.left = margin;
myMarginPreferences.top = margin;
myMarginPreferences.right = margin;
myMarginPreferences.bottom = margin;

for (var colorName in colors) {
  var color = colors[colorName];
  try {
    myDoc.colors.add({
      name: colorName,
      model: ColorModel.process,
      colorValue: color,
    });
  } catch (e) {
    // Color already exists, do nothing
  }
}

var myPage = myDoc.pages.item(0);
myPage.rectangles.add({
  geometricBounds: [
    margin / 3,
    margin / 3,
    myDoc.documentPreferences.pageHeight - margin / 3,
    myDoc.documentPreferences.pageWidth - margin / 3,
  ],
  strokeWeight: subGridFrameWidth,
  strokeColor: "coolGray",
  fillColor: "None",
});


// Add title text
if (supTitleBarHeight > 0) {
  var titleTextFrame = myPage.textFrames.add({
    geometricBounds: [
      margin,
      margin,
      margin + supTitleBarHeight,
      margin + 1000,
    ],
  });
  titleTextFrame.contents = "merged"
  titleTextFrame.texts[0].appliedFont = myFont;
  titleTextFrame.texts[0].fontStyle = "Bold";
  titleTextFrame.texts[0].pointSize = titleFontSize;
  titleTextFrame.textColumns.everyItem().fillColor = "black";
  titleTextFrame.fit(FitOptions.FRAME_TO_CONTENT);
}

if (supSideBarWidth > 0) {
  // Add channel names to the sidebar
  var yPosition = margin + supTitleBarHeight + textGap / 2;
  var textFrame = myPage.textFrames.add({
    geometricBounds: [
      yPosition - textGap / 2, // top
      pageSize[0] + 20, // left
      yPosition + textGap / 2, // bottom
      pageSize[0] + supSideBarWidth + 30, // right
    ],
  });
  // Add the channel name text
  // textFrame.contents = "channels:";
  textFrame.contents = "E6: duplicate 1";
  // Set the text formatting
  textFrame.texts[0].appliedFont = myFont;
  textFrame.texts[0].fontStyle = "Bold";
  textFrame.texts[0].pointSize = sideBarFontSize;
  textFrame.textColumns.everyItem().fillColor = "matlabOrange";
  // fit content to frame
  textFrame.fit(FitOptions.FRAME_TO_CONTENT);

  var yPosition = yPosition + textGap;
  var textFrame = myPage.textFrames.add({
    geometricBounds: [
      yPosition - textGap / 2, // top
      pageSize[0] + 20, // left
      yPosition + textGap / 2, // bottom
      pageSize[0] + supSideBarWidth + 30, // right
    ],
  });
  // Add the channel name text
  // textFrame.contents = "channels:";
  textFrame.contents = "E6: duplicate 2";
  // Set the text formatting
  textFrame.texts[0].appliedFont = myFont;
  textFrame.texts[0].fontStyle = "Bold";
  textFrame.texts[0].pointSize = sideBarFontSize;
  textFrame.textColumns.everyItem().fillColor = "matlabDarkRed";
  // fit content to frame
  textFrame.fit(FitOptions.FRAME_TO_CONTENT);

  var yPosition = yPosition + textGap;
  var textFrame = myPage.textFrames.add({
    geometricBounds: [
      yPosition - textGap / 2, // top
      pageSize[0] + 20, // left
      yPosition + textGap / 2, // bottom
      pageSize[0] + supSideBarWidth + 30, // right
    ],
  });
  // Add the channel name text
  // textFrame.contents = "channels:";
  textFrame.contents = "mTeSR: duplicate 1";
  // Set the text formatting
  textFrame.texts[0].appliedFont = myFont;
  textFrame.texts[0].fontStyle = "Bold";
  textFrame.texts[0].pointSize = sideBarFontSize;
  textFrame.textColumns.everyItem().fillColor = "matlabCyan";
  // fit content to frame
  textFrame.fit(FitOptions.FRAME_TO_CONTENT);


  var yPosition = yPosition + textGap;
  var textFrame = myPage.textFrames.add({
    geometricBounds: [
      yPosition - textGap / 2, // top
      pageSize[0] + 20, // left
      yPosition + textGap / 2, // bottom
      pageSize[0] + supSideBarWidth + 30, // right
    ],
  });
  // Add the channel name text
  // textFrame.contents = "channels:";
  textFrame.contents = "mTeSR: duplicate 2";
  // Set the text formatting
  textFrame.texts[0].appliedFont = myFont;
  textFrame.texts[0].fontStyle = "Bold";
  textFrame.texts[0].pointSize = sideBarFontSize;
  textFrame.textColumns.everyItem().fillColor = "matlabBlue";
  // fit content to frame
  textFrame.fit(FitOptions.FRAME_TO_CONTENT);
}

function drawGrid(grid) {
  if (grid == null) {
    return;
  } else {
    var gridOrigin_x = grid.origin_x + margin;
    var gridOrigin_y = grid.origin_y + margin + supTitleBarHeight;
    const gridWidth = grid.ncol * subGridWidth + (grid.ncol - 1) * gap + sideBarWidth + grid.gridMargin[0] + grid.gridMargin[1];
    const gridHeight = grid.nrow * subGridHeight + (grid.nrow - 1) * gap + titleBarHeight + grid.gridMargin[2] + grid.gridMargin[3];
    const gridRect = myDoc.pages.item(0).rectangles.add({
      geometricBounds: [
        gridOrigin_y,
        gridOrigin_x,
        gridOrigin_y + gridHeight,
        gridOrigin_x + gridWidth,
      ],
      fillColor: myDoc.swatches.item("Paper"),
      strokeColor: myDoc.swatches.item(grid.gridFrameColor),
      strokeWeight: subGridFrameWidth,
    });
    drawGrid(grid.rightTop);
    drawGrid(grid.rightBottom);
    drawGrid(grid.bottomLeft);
    drawGrid(grid.bottomRight);
    gridOrigin_x = gridOrigin_x + subGridOffset;
    gridOrigin_y = gridOrigin_y + subGridOffset;

    var next_img_index = 0;
    var fill_idx1 = grid.nrow;
    var fill_idx2 = grid.ncol;
    if (!grid.byRow) {
      fill_idx1 = grid.ncol;
      fill_idx2 = grid.nrow;
    }
    for (var i = 0; i < fill_idx1; i++) {
      for (var j = 0; j < fill_idx2; j++) {
        if (next_img_index == grid.condition_list.length) {
          break;
        }
        if (grid.byRow) {
          var subGridOrigin_x = gridOrigin_x + j * (subGridWidth + gap) + grid.gridMargin[0];
          var subGridOrigin_y = gridOrigin_y + i * (subGridHeight + gap) + titleBarHeight + grid.gridMargin[3];
        } else {
          var subGridOrigin_x = gridOrigin_x + i * (subGridWidth + gap) + grid.gridMargin[0];
          var subGridOrigin_y = gridOrigin_y + j * (subGridHeight + gap) + titleBarHeight + grid.gridMargin[3];
        }

        // if (grid.byRow) {
        //   if (i == 0 && i != grid.nrow - 1) {
        //     subGridOrigin_y += subGridOffset;
        //   }
        //   if (j == 0 && j != grid.ncol - 1) {
        //     subGridOrigin_x += subGridOffset;
        //   }
        //   if (i == grid.nrow - 1 && i != 0) {
        //     subGridOrigin_y -= subGridOffset;
        //   }
        //   if (j == grid.ncol - 1 && j != 0) {
        //     subGridOrigin_x -= subGridOffset;
        //   }
        // } else {
        //   if (j == 0 && j != grid.nrow - 1) {
        //     subGridOrigin_y += subGridOffset;
        //   }
        //   if (i == 0 && i != grid.ncol - 1) {
        //     subGridOrigin_x += subGridOffset;
        //   }
        //   if (j == grid.nrow - 1 && j != 0) {
        //     subGridOrigin_y -= subGridOffset;
        //   }
        //   if (i == grid.ncol - 1 && i != 0) {
        //     subGridOrigin_x -= subGridOffset;
        //   }
        // }
        var frameShrink_x = subGridOffset * 2;
        var frameShrink_y = subGridOffset * 2;
        // if (grid.byRow) {
        //   if (i == grid.nrow - 1) {
        //     // subGridOrigin_y += subGridOffset;
        //     frameShrink_y += subGridOffset * 2;
        //   }
        //   if (j == grid.ncol - 1) {
        //     // subGridOrigin_x += subGridOffset;
        //     frameShrink_x += subGridOffset * 2;
        //   }
        // } else {
        //   if (i == grid.col - 1) {
        //     // subGridOrigin_y += subGridOffset;
        //     frameShrink_y += subGridOffset * 2;
        //   }
        //   if (j == grid.nrow - 1) {
        //     // subGridOrigin_x += subGridOffset;
        //     frameShrink_x += subGridOffset * 2;
        //   }
        // }
        var subGridRect = myDoc.pages.item(0).rectangles.add({
          geometricBounds: [
            subGridOrigin_y,
            subGridOrigin_x,
            subGridOrigin_y + subGridHeight - frameShrink_y,
            subGridOrigin_x + subGridWidth - frameShrink_x,
          ],
          fillColor: myDoc.swatches.item("Paper"),
          strokeWeight: 0.5,
          strokeColor: "Black",
        });

        if (grid.ylabel_type == "time") {
          if ((grid.byRow && j == 0) || (!grid.byRow && i == 0)) {
            var radius = grid.gridMargin[0] * 0.25;
            var cx = gridOrigin_x + grid.gridMargin[0] * 0.5;
            var cy = subGridOrigin_y + subGridHeight * 0.5;
            var circle = myPage.ovals.add();
            circle.geometricBounds = [
              cy - radius,
              cx - radius,
              cy + radius,
              cx + radius,
            ];
            circle.strokeWeight = 4;

            line1 = myPage.graphicLines.add();
            line1.paths[0].entirePath = [[cx, cy], [cx + radius * 0.4, cy]];
            line2 = myPage.graphicLines.add();
            line2.paths[0].entirePath = [[cx, cy], [cx, cy - radius * 0.6]];
            line1.strokeWeight = 4;
            line2.strokeWeight = 4;
            line1.endCap = EndCap.ROUND_END_CAP;
            line1.endJoin = EndJoin.ROUND_END_JOIN;
            line2.endCap = EndCap.ROUND_END_CAP;
            line2.endJoin = EndJoin.ROUND_END_JOIN;

            var titleTextFrame = myPage.textFrames.add({
              geometricBounds: [
                cy + radius * 1.1,
                cx - textBox[0] * 0.5,
                cy + radius * 1.1 + textBox[1],
                cx + textBox[0] * 0.5
              ],
            });
            if (grid.byRow) {
              titleTextFrame.contents = grid.ylabels[i];
            } else {
              titleTextFrame.contents = grid.ylabels[j];
            }
            titleTextFrame.texts[0].appliedFont = myFont;
            titleTextFrame.texts[0].fontStyle = "Bold";
            titleTextFrame.texts[0].pointSize = 15;
            titleTextFrame.parentStory.justification = Justification.CENTER_ALIGN;
            // titleTextFrame.textColumns.everyItem().fillColor = "black";
            // titleTextFrame.fit(FitOptions.FRAME_TO_CONTENT);
          }
        }

        try {
          subGridRect.place(
            File(
              grid.folder_path +
              "/" +
              grid.prefix +
              grid.condition_list[next_img_index] +
              grid.postfix
            )
          );
        } catch (e) {

        }
        next_img_index++;
        subGridRect.fit(FitOptions.PROPORTIONALLY);
        subGridRect.frameFittingOptions.fittingAlignment =
          AnchorPoint.BOTTOM_CENTER_ANCHOR;

        subGridRect.frameFittingOptions.topCrop = cropTop;
        subGridRect.frameFittingOptions.bottomCrop = cropBottom;
        subGridRect.frameFittingOptions.leftCrop = cropLeft;
        subGridRect.frameFittingOptions.rightCrop = cropRight;
        // try {
        //   subGridRect.place(
        //     File(
        //       grid.folder_path +
        //       "/" +
        //       grid.prefix +
        //       grid.condition_list[next_img_index] +
        //       grid.postfix
        //     )
        //   );
        //   next_img_index++;
        //   subGridRect.fit(FitOptions.PROPORTIONALLY);
        //   subGridRect.frameFittingOptions.fittingAlignment =
        //     AnchorPoint.BOTTOM_CENTER_ANCHOR;
        //
        //   subGridRect.frameFittingOptions.topCrop = cropTop;
        //   subGridRect.frameFittingOptions.bottomCrop = cropBottom;
        //   subGridRect.frameFittingOptions.leftCrop = cropLeft;
        //   subGridRect.frameFittingOptions.rightCrop = cropRight;
        // } catch (e) {
        //   // alert("Error placing image: " + e);
        // }
      }
      // add channel names
    }
    if (sideBarWidth > 0) {
      var yPosition = gridOrigin_y + titleBarHeight + textGap * 3 / 4;
      var textFrame = myPage.textFrames.add({
        geometricBounds: [
          yPosition - textGap / 2, // top
          gridOrigin_x +
          grid.ncol * subGridWidth +
          (grid.ncol - 1) * gap +
          sideBarWidth * 0.05, // left
          yPosition + textGap / 2, // bottom
          gridOrigin_x +
          grid.ncol * subGridWidth +
          (grid.ncol - 1) * gap +
          sideBarWidth -
          sideBarWidth * 0.05, // right
        ],
      });
      textFrame.contents = "channels:";
      // Set the text formatting
      textFrame.texts[0].appliedFont = myFont;
      textFrame.texts[0].fontStyle = "Bold";
      textFrame.texts[0].pointSize = sideBarFontSize;
      textFrame.textColumns.everyItem().fillColor = "Black";
      // fit content to frame
      textFrame.fit(FitOptions.FRAME_TO_CONTENT);
      for (var i = 0; i < grid.channelNames.length; i++) {
        // Calculate vertical position for each channel name
        var yPosition =
          gridOrigin_y + textGap / 3 + titleBarHeight + (textGap / 2) * (1 + 2 * (i + 1));
        // Create text frame in the sidebar
        var textFrame = myPage.textFrames.add({
          geometricBounds: [
            yPosition - textGap / 2, // top
            gridOrigin_x +
            grid.ncol * subGridWidth +
            (grid.ncol - 1) * gap +
            sideBarWidth * 0.05, // left
            yPosition + textGap / 2, // bottom
            gridOrigin_x +
            grid.ncol * subGridWidth +
            (grid.ncol - 1) * gap +
            sideBarWidth -
            sideBarWidth * 0.05, // right
          ],
        });
        // Add the channel name text
        textFrame.contents = grid.channelNames[i];

        // Set the text formatting
        textFrame.texts[0].appliedFont = myFont;
        textFrame.texts[0].fontStyle = "Bold";
        textFrame.texts[0].pointSize = sideBarFontSize;
        textFrame.textColumns.everyItem().fillColor = grid.channelColors[i];

        // fit content to frame
        textFrame.fit(FitOptions.FRAME_TO_CONTENT);
      }
      // Add cell line to the sidebar
      var yPosition =
        gridOrigin_y +
        titleBarHeight +
        (textGap / 2) * (1 + 2 * (grid.channelNames.length + 3));
      var textFrame = myPage.textFrames.add({
        geometricBounds: [
          yPosition - textGap / 2, // top
          gridOrigin_x +
          grid.ncol * subGridWidth +
          (grid.ncol - 1) * gap +
          sideBarWidth * 0.05, // left
          yPosition + textGap / 2, // bottom
          gridOrigin_x +
          grid.ncol * subGridWidth +
          (grid.ncol - 1) * gap +
          sideBarWidth -
          sideBarWidth * 0.05, // right
        ],
      });
      // Add the channel name text
      textFrame.contents = "cell line:";
      // Set the text formatting
      textFrame.texts[0].appliedFont = myFont;
      textFrame.texts[0].fon100tStyle = "Bold";
      textFrame.texts[0].pointSize = sideBarFontSize;
      textFrame.textColumns.everyItem().fillColor = "Black";
      // fit content to frame
      textFrame.fit(FitOptions.FRAME_TO_CONTENT);

      var yPosition =
        gridOrigin_y +
        titleBarHeight +
        (textGap / 2) * (1 + 2 * (grid.channelNames.length + 4));
      var textFrame = myPage.textFrames.add({
        geometricBounds: [
          yPosition - textGap / 2, // top
          gridOrigin_x +
          grid.ncol * subGridWidth +
          (grid.ncol - 1) * gap +
          sideBarWidth * 0.05, // left
          yPosition + textGap / 2, // bottom
          gridOrigin_x +
          grid.ncol * subGridWidth +
          (grid.ncol - 1) * gap +
          sideBarWidth -
          sideBarWidth * 0.05, // right
        ],
      });
      // Add the channel name text
      textFrame.contents = "PGP117";
      // Set the text formatting
      textFrame.texts[0].appliedFont = myFont;
      textFrame.texts[0].fontStyle = "Bold";
      textFrame.texts[0].pointSize = sideBarFontSize;
      textFrame.textColumns.everyItem().fillColor = "Black";
      // fit content to frame
      textFrame.fit(FitOptions.FRAME_TO_CONTENT);
    }
    if (titleBarHeight > 0) {
      var titleTextFrame = myPage.textFrames.add({
        geometricBounds: [
          gridOrigin_y,
          gridOrigin_x,
          gridOrigin_y + titleBarHeight,
          gridOrigin_x + gridWidth - subGridOffset * 2,
        ],
      });
      titleTextFrame.contents = grid.title;
      titleTextFrame.texts[0].appliedFont = myFont;
      titleTextFrame.texts[0].fontStyle = "Bold";
      titleTextFrame.texts[0].pointSize = titleFontSize;
      titleTextFrame.textColumns.everyItem().fillColor = "black";
      titleTextFrame.fit(FitOptions.FRAME_TO_CONTENT);
    }

    if (grid.xlabel_type == "dose") {
      grad_trig = myPage.polygons.add();
      grad_trig.paths[0].entirePath = [
        [gridOrigin_x + grid.gridMargin[0] + subGridWidth * 0.5, gridOrigin_y + titleBarHeight + grid.gridMargin[3]],
        [gridOrigin_x + gridWidth - subGridWidth * 0.5, gridOrigin_y + titleBarHeight + grid.gridMargin[3]],
        [gridOrigin_x + gridWidth - subGridWidth * 0.5, gridOrigin_y + titleBarHeight + grid.gridMargin[3] * 0.5]
      ];
      grad_trig.fillColor = "black";
      var grid_trig_width = gridOrigin_x + gridWidth - subGridWidth * 0.5 - (gridOrigin_x + grid.gridMargin[0] + subGridWidth * 0.5);
      for (var i = 0; i < grid.xlabels.length; i++) {
        var titleTextFrame = myPage.textFrames.add({
          geometricBounds: [
            gridOrigin_y + subGridOffset + titleBarHeight,
            gridOrigin_x + grid.gridMargin[0] + subGridWidth * 0.5 + (subGridWidth + gap) * i - textBox[0] * 0.5,
            gridOrigin_y + subGridOffset + titleBarHeight + textBox[1],
            gridOrigin_x + grid.gridMargin[0] + subGridWidth * 0.5 + (subGridWidth + gap) * i + textBox[0] * 0.5
          ],
        });
        titleTextFrame.contents = grid.xlabels[i];
        titleTextFrame.texts[0].appliedFont = myFont;
        titleTextFrame.texts[0].fontStyle = "Bold";
        titleTextFrame.texts[0].pointSize = 15;
        titleTextFrame.parentStory.justification = Justification.CENTER_ALIGN;
      }
    }

  }
}

drawGrid(gridList[rootGrid]);
