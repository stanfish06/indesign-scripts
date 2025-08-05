#include "../classes/grids.jsx";
#include "../constants/colors.jsx";

const supTitleBarHeight = 0;
const supSideBarWidth = 0;
const titleBarHeight = 40;
const sideBarWidth = 0;
const subGridWidth = 325;
const subGridHeight = 300;
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
const titleFontSize = 26;
const titleFontColor = 'black';
const textBox = [120, 60];
const mainTitle = "";

const gridList = [
  new subGrid(
    1,
    1,
    "ESI PGC, control, 160k seed",
    ["DAPI", "EOMES", "TFAP2C", "SOX17"],
    ["lightGray", "red", "green", "blue"],
    [
      'C3A100;B50;B50'
    ],
    "",
    "TFAP2C_EOMES_",
    "_scatter_SOX17.png",
    "blockc_531",
    false,
    "",
    [],
    "",
    [],
    [0, 0, 0, 40],
    "Solid",
  ),
];
gridList[0].setChildGrid(gridList[1], 'rightTop')

const rootGrid = 0;

const pageSize = getPageSize(gridList[rootGrid]);

var myFont = app.fonts.item("Arial");
var myDoc = app.documents.add();
defineColors(myDoc);

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
