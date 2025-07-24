#include "./classes/grids.jsx";

const supTitleBarHeight = 0;
const supSideBarWidth = 0;
const titleBarHeight = 110;
const sideBarWidth = 0;
const subGridWidth = 300;
const subGridHeight = 400;
const gridAxesLabelFontSize = 20;
const margin = 10;
// margins for left, right, bottom, top
const gap = 10;
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
const textBox = [120, 60];
const mainTitle = "";

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

const gridList = [
  new subGrid(
    1,
    2,
    "ESI, PGC induction, controls",
    ["DAPI", "EOMES", "TFAP2C", "SOX17"],
    ["lightGray", "red", "green", "blue"],
    [
      'C3A100;B50;B50 (ESI)',
      'C6B50;B50A10;B50 (ESI)',
      'B50;C6B50A10;B50IWP2 (ESI)',
      'C6B50;B50A10;B50A1IWP2 (ESI)',
      'C6B50;B50A10;B50IWP2 (ESI)',
    ],
    "C:/Users/zhiyu/OneDrive - Umich/dump/2025-07-23/exp20/plate1/mip_montage",
    "",
    "_merged.png",
    "matlabGreen",
    true,
    "",
    [],
    "",
    [],
    [0, 0, 0, 20]
  ),
];

const rootGrid = 0;

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
  titleTextFrame.contents = mainTitle
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

drawGrid(gridList[rootGrid]);
