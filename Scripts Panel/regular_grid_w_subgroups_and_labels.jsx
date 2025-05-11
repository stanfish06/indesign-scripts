const supTitleBarHeight = 0;
const supSideBarWidth = 130;
const titleBarHeight = 30;
const sideBarWidth = 0;
const subGridWidth = 325;
const subGridHeight = 300;
const margin = 10;
const gap = 20;
const subGridFrameWidth = 5;
const subGridOffset = 5;
var cropTop = 0; // Top crop
var cropBottom = 0; // Bottom crop
var cropLeft = 100; // Left crop
var cropRight = 100; // Right crop

const textGap = 20;
const sideBarFontSize = 20;
const titleFontSize = 30;
const titleFontColor = 'black';

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
  gridFrameColor
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
}

subGrid.prototype.setChildGrid = function (childGrid, position) {
  if (position == "rightTop") {
    this.rightTop = childGrid;
    childGrid.origin_x = this.origin_x + this.ncol * subGridWidth + (this.ncol - 1) * gap + gap + sideBarWidth;
    childGrid.origin_y = this.origin_y;
  } else if (position == "rightBottom") {
    this.rightBottom = childGrid;
    childGrid.origin_x =
      this.origin_x + this.ncol * subGridWidth + (this.ncol - 1) * gap + gap + sideBarWidth;
    childGrid.origin_y =
      this.origin_y + this.nrow * subGridHeight + (this.nrow - 1) * gap + gap + titleBarHeight;
  } else if (position == "bottomLeft") {
    this.bottomLeft = childGrid;
    childGrid.origin_x = this.origin_x;
    childGrid.origin_y =
      this.origin_y + this.nrow * subGridHeight + (this.nrow - 1) * gap + gap + titleBarHeight;
  } else if (position == "bottomRight") {
    this.bottomRight = childGrid;
    childGrid.origin_x =
      this.origin_x + this.ncol * subGridWidth + (this.ncol - 1) * gap + gap + sideBarWidth;
    childGrid.origin_y =
      this.origin_y + this.nrow * subGridHeight + (this.nrow - 1) * gap + gap + titleBarHeight;
  }
};

const gridList = [
  new subGrid(
    3,
    3,
    "TFAP2C against SOX17 (colored by TBXT)",
    ["DAPI", "TFAP2C", "TBXT", "SOX17"],
    ["lightGray", "red", "green", "blue"],
    [
      "DEa-DEb;C2A100 (day 1);A100L250 (day 2)",
      "APS-DEb;C4A30F20 (day 1);A100L250 (day 2)",
      "MPS-DEb;B40C6A30F20 (day 1);A100L250 (day 2)",
      "PPS-DEb;B40C6F20 (day 1);A100L250 (day 2)",
      "DEa-LM;C2A100 (day 1);B30+IWP2+A8301 (day 2)",
      "APS-LM;C4A30F20 (day 1);B30+IWP2+A8301 (day 2)",
      "MPS-LM;B40C6A30F20 (day 1);B30+IWP2+A8301 (day 2)",
      "PPS-LM;B40C6F20 (day 1);B30+IWP2+A8301 (day 2)",
      "PPS-DEb (mstar);B40C6F20 (day 1);A100L250 (day 2)",
    ],
    "C:/Users/zhiyu/OneDrive - Umich/dump/2025-05-08/scatter_AP2C_MP",
    "SOX17_TFAP2C_",
    "_scatter_TBXT.png",
    "matlabBlue"
  ),
  new subGrid(
    3,
    3,
    "TFAP2C against SOX17 (colored by density)",
    ["DAPI", "TFAP2C", "TBXT", "SOX17"],
    ["lightGray", "red", "green", "blue"],
    [
      "DEa-DEb;C2A100 (day 1);A100L250 (day 2)",
      "APS-DEb;C4A30F20 (day 1);A100L250 (day 2)",
      "MPS-DEb;B40C6A30F20 (day 1);A100L250 (day 2)",
      "PPS-DEb;B40C6F20 (day 1);A100L250 (day 2)",
      "DEa-LM;C2A100 (day 1);B30+IWP2+A8301 (day 2)",
      "APS-LM;C4A30F20 (day 1);B30+IWP2+A8301 (day 2)",
      "MPS-LM;B40C6A30F20 (day 1);B30+IWP2+A8301 (day 2)",
      "PPS-LM;B40C6F20 (day 1);B30+IWP2+A8301 (day 2)",
      "PPS-DEb (mstar);B40C6F20 (day 1);A100L250 (day 2)",
    ],
    "C:/Users/zhiyu/OneDrive - Umich/dump/2025-05-08/scatter_AP2C_MP",
    "SOX17_TFAP2C_",
    "_scatter_density.png",
    "matlabBlue"
  ),
  new subGrid(
    3,
    3,
    "FOXA2 against HAND1 (colored by EOMES)",
    ["DAPI", "FOXA2", "EOMES", "HAND1"],
    ["lightGray", "red", "green", "blue"],
    [
      "DEa-DEb;C2A100 (day 1);A100L250 (day 2)",
      "APS-DEb;C4A30F20 (day 1);A100L250 (day 2)",
      "MPS-DEb;B40C6A30F20 (day 1);A100L250 (day 2)",
      "PPS-DEb;B40C6F20 (day 1);A100L250 (day 2)",
      "DEa-LM;C2A100 (day 1);B30+IWP2+A8301 (day 2)",
      "APS-LM;C4A30F20 (day 1);B30+IWP2+A8301 (day 2)",
      "MPS-LM;B40C6A30F20 (day 1);B30+IWP2+A8301 (day 2)",
      "PPS-LM;B40C6F20 (day 1);B30+IWP2+A8301 (day 2)",
      "PPS-DEb (mstar);B40C6F20 (day 1);A100L250 (day 2)",
    ],
    "C:/Users/zhiyu/OneDrive - Umich/dump/2025-05-08/scatter_FOXA2_MP",
    "HAND1_FOXA2_",
    "_scatter_EOMES.png",
    "matlabOrange"
  ),
  new subGrid(
    3,
    3,
    "FOXA2 against HAND1 (colored by density)",
    ["DAPI", "FOXA2", "EOMES", "HAND1"],
    ["lightGray", "red", "green", "blue"],
    [
      "DEa-DEb;C2A100 (day 1);A100L250 (day 2)",
      "APS-DEb;C4A30F20 (day 1);A100L250 (day 2)",
      "MPS-DEb;B40C6A30F20 (day 1);A100L250 (day 2)",
      "PPS-DEb;B40C6F20 (day 1);A100L250 (day 2)",
      "DEa-LM;C2A100 (day 1);B30+IWP2+A8301 (day 2)",
      "APS-LM;C4A30F20 (day 1);B30+IWP2+A8301 (day 2)",
      "MPS-LM;B40C6A30F20 (day 1);B30+IWP2+A8301 (day 2)",
      "PPS-LM;B40C6F20 (day 1);B30+IWP2+A8301 (day 2)",
      "PPS-DEb (mstar);B40C6F20 (day 1);A100L250 (day 2)",
    ],
    "C:/Users/zhiyu/OneDrive - Umich/dump/2025-05-08/scatter_FOXA2_MP",
    "HAND1_FOXA2_",
    "_scatter_density.png",
    "matlabOrange"
  ),
];

gridList[0].setChildGrid(gridList[1], "bottomLeft");
gridList[0].setChildGrid(gridList[2], "rightTop");
gridList[2].setChildGrid(gridList[3], "bottomLeft");

const rootGrid = 0;

function getPageSize(grid) {
  if (grid == null) {
    return [-gap, -gap];
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
      sideBarWidth,
      sz2[0] +
      gap +
      grid.ncol * subGridWidth +
      (grid.ncol - 1) * gap +
      sideBarWidth,
      sz3[0] + sideBarWidth
    );
    const bd_height = Math.max(
      sz3[1] + gap + grid.nrow * subGridHeight + (grid.nrow - 1) * gap + titleBarHeight,
      sz4[1] + gap + grid.nrow * subGridHeight + (grid.nrow - 1) * gap + titleBarHeight,
      sz2[1] + titleBarHeight,
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
myDoc.documentPreferences.pageWidth = pageSize[0] + 2 * margin + supSideBarWidth;

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
      margin + 500,
    ],
  });
  titleTextFrame.contents = " ";
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
      pageSize[0] + supSideBarWidth, // right
    ],
  });
  // Add the channel name text
  // textFrame.contents = "channels:";
  textFrame.contents = "duplicate 1";
  // Set the text formatting
  textFrame.texts[0].appliedFont = myFont;
  textFrame.texts[0].fontStyle = "Bold";
  textFrame.texts[0].pointSize = sideBarFontSize;
  textFrame.textColumns.everyItem().fillColor = "matlabBlue";
  // fit content to frame
  textFrame.fit(FitOptions.FRAME_TO_CONTENT);

  var yPosition = yPosition + textGap;
  var textFrame = myPage.textFrames.add({
    geometricBounds: [
      yPosition - textGap / 2, // top
      pageSize[0] + 20, // left
      yPosition + textGap / 2, // bottom
      pageSize[0] + supSideBarWidth, // right
    ],
  });
  // Add the channel name text
  // textFrame.contents = "channels:";
  textFrame.contents = "duplicate 2";
  // Set the text formatting
  textFrame.texts[0].appliedFont = myFont;
  textFrame.texts[0].fontStyle = "Bold";
  textFrame.texts[0].pointSize = sideBarFontSize;
  textFrame.textColumns.everyItem().fillColor = "matlabOrange";
  // fit content to frame
  textFrame.fit(FitOptions.FRAME_TO_CONTENT);
}

function drawGrid(grid) {
  if (grid == null) {
    return;
  } else {
    const gridOrigin_x = grid.origin_x + margin;
    const gridOrigin_y = grid.origin_y + margin + supTitleBarHeight;
    const gridWidth = grid.ncol * subGridWidth + (grid.ncol - 1) * gap + sideBarWidth;
    const gridHeight = grid.nrow * subGridHeight + (grid.nrow - 1) * gap + titleBarHeight;
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

    var next_img_index = 0;
    for (var i = 0; i < grid.nrow; i++) {
      for (var j = 0; j < grid.ncol; j++) {
        var subGridOrigin_x = gridOrigin_x + j * (subGridWidth + gap);
        var subGridOrigin_y = gridOrigin_y + i * (subGridHeight + gap) + titleBarHeight;
        if (i == 0) {
          subGridOrigin_y += subGridOffset;
        }
        if (j == 0) {
          subGridOrigin_x += subGridOffset;
        }
        if (i == grid.nrow - 1) {
          subGridOrigin_y -= subGridOffset;
        }
        if (j == grid.ncol - 1) {
          subGridOrigin_x -= subGridOffset;
        }
        var frameShrink_x = 0;
        var frameShrink_y = 0;
        if (i == 0 && i == grid.nrow - 1) {
          subGridOrigin_y += subGridOffset;
          frameShrink_y += subGridOffset * 2;
        }
        if (j == 0 && j == grid.ncol - 1) {
          subGridOrigin_x += subGridOffset;
          frameShrink_x += subGridOffset * 2;
        }
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

        subGridRect.place(
          File(
            grid.folder_path +
            "/" +
            grid.prefix +
            grid.condition_list[next_img_index] +
            grid.postfix
          )
        );
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
      textFrame.texts[0].fontStyle = "Bold";
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
      textFrame.contents = "ESI17";
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
          gridOrigin_y + subGridOffset,
          gridOrigin_x + subGridOffset,
          gridOrigin_y + titleBarHeight,
          gridOrigin_x + gridWidth,
        ],
      });
      titleTextFrame.contents = grid.title;
      titleTextFrame.texts[0].appliedFont = myFont;
      titleTextFrame.texts[0].fontStyle = "Bold";
      titleTextFrame.texts[0].pointSize = titleFontSize;
      titleTextFrame.textColumns.everyItem().fillColor = "black";
      titleTextFrame.fit(FitOptions.FRAME_TO_CONTENT);
    }
  }
}

drawGrid(gridList[rootGrid]);
