// import is only required for standalone execution, no need for debug.
// const { app, MeasurementUnits, RulerOrigin } = require("indesign");

const nrow = 3;
const ncol = 6;
const titleBarHeight = 50;
const sideBarWidth = 100;
const subGridWidth = 400;
const subGridHeight = 425;
const margin = 10;
const gap = 10;
const channelNames = ["Channel 1", "Channel 2", "Channel 3"];
const title = "Title";

const channelColors = [
  [0, 100, 100, 0], // Red
  [100, 0, 100, 0], // Green
  [100, 100, 0, 0], // Blue
];
const textGap = 30;
const sideBarFontSize = 18;
const titleFontSize = 24;
const titleFontColor = [0, 0, 0, 100]; // Black

var myFont = app.fonts.item("Arial");
var myDoc = app.documents.add();

// set measuremnet units to points
myDoc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;
myDoc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.points;
myDoc.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;

// set document preferences, no need for facing pages
myDoc.documentPreferences.facingPages = false;
myDoc.documentPreferences.pageHeight =
  nrow * subGridHeight + (nrow - 1) * gap + 2 * margin + titleBarHeight;
myDoc.documentPreferences.pageWidth =
  ncol * subGridWidth + (ncol - 1) * gap + 2 * margin + sideBarWidth;

var myMasterSpread = myDoc.masterSpreads.item(0);
var myMarginPreferences = myMasterSpread.pages.item(0).marginPreferences;
//Now set up the page margins and columns.
myMarginPreferences.left = margin;
myMarginPreferences.top = margin;
myMarginPreferences.right = margin;
myMarginPreferences.bottom = margin;

for (var i = 0; i < channelNames.length; i++) {
  app.activeDocument.colors.add({
    name: channelNames[i],
    model: ColorModel.process,
    colorValue: channelColors[i],
  });
}
app.activeDocument.colors.add({
  name: 'title',
  model: ColorModel.process,
  colorValue: titleFontColor,
});

// Create guides for rows and columns that account for title bar and side bar
var myPage = myDoc.pages.item(0);

// Create horizontal guides (rows)
// First guide after the title bar
myPage.guides.add({
  orientation: HorizontalOrVertical.horizontal,
  location: margin + titleBarHeight,
});

// Create remaining row guides
for (var i = 1; i < nrow; i++) {
  myPage.guides.add({
    orientation: HorizontalOrVertical.horizontal,
    location:
      margin + titleBarHeight + (i - 1) * (subGridHeight + gap) + subGridHeight,
  });
  myPage.guides.add({
    orientation: HorizontalOrVertical.horizontal,
    location: margin + titleBarHeight + i * (subGridHeight + gap),
  });
}

// Create vertical guides (columns)
for (var j = 1; j < ncol; j++) {
  myPage.guides.add({
    orientation: HorizontalOrVertical.vertical,
    location: margin + (j - 1) * (subGridWidth + gap) + subGridWidth,
  });
  myPage.guides.add({
    orientation: HorizontalOrVertical.vertical,
    location: margin + j * (subGridWidth + gap),
  });
}

// Add vertical guide to separate main grid from side bar
myPage.guides.add({
  orientation: HorizontalOrVertical.vertical,
  location: margin + ncol * subGridWidth + (ncol - 1) * gap,
});

// Add channel names to the sidebar
for (var i = 0; i < channelNames.length; i++) {
  // Calculate vertical position for each channel name
  var yPosition = margin + titleBarHeight + (textGap / 2) * (1 + 2 * i);

  // Create text frame in the sidebar
  var textFrame = myPage.textFrames.add({
    geometricBounds: [
      yPosition - textGap / 2, // top
      margin + ncol * subGridWidth + (ncol - 1) * gap + sideBarWidth * 0.05, // left
      yPosition + textGap / 2, // bottom
      margin +
        ncol * subGridWidth +
        (ncol - 1) * gap +
        sideBarWidth -
        sideBarWidth * 0.05, // right
    ],
  });

  // Add the channel name text
  textFrame.contents = channelNames[i];

  // Set the text formatting
  textFrame.texts[0].appliedFont = myFont;
  textFrame.texts[0].fontStyle = "Bold";
  textFrame.texts[0].pointSize = sideBarFontSize;
  textFrame.textColumns.everyItem().fillColor = channelNames[i];

  // fit content to frame
  textFrame.fit(FitOptions.FRAME_TO_CONTENT);
}

// Add title text
var titleTextFrame = myPage.textFrames.add({
  geometricBounds: [
    margin,
    margin,
    margin + titleBarHeight,
    margin + ncol * subGridWidth + (ncol - 1) * gap + sideBarWidth,
  ],
});
titleTextFrame.contents = title;
titleTextFrame.texts[0].appliedFont = myFont;
titleTextFrame.texts[0].fontStyle = "Bold";
titleTextFrame.texts[0].pointSize = titleFontSize;
titleTextFrame.textColumns.everyItem().fillColor = "title";
titleTextFrame.fit(FitOptions.FRAME_TO_CONTENT);