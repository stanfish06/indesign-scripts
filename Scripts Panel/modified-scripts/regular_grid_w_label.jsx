// import is only required for standalone execution, no need for debug.
// const { app, MeasurementUnits, RulerOrigin } = require("indesign");

const nrow = 3;
const ncol = 6;
const titleBarHeight = 30;
const sideBarWidth = 100; // 100
const subGridWidth = 400;
const subGridHeight = 400;
const margin = 10;
const gap = 10;
const channelNames = ["DAPI", "EOMES", "TBXT", "NANOG"];
const title = "TFAP2C against SOX17 (color by EOMES)";
// const folder_path = "C:/Users/zhiyu/Downloads";
const folder_path = "C:/Users/zhiyu/Downloads/exp10/mip_montage";
const postfix = "_merged.png";
const prefix = ""

// const condition_list = [
//   'ESI;C3A100(0-12h);A100B40(12-24h w F20)',
//   ';ESI;C3A30(0-24h w F20)',
//   ';ESI;C3B40(0-24h w F20)',
//   'NKO;C3A100(0-12h);A100B40(12-24h w F20)',
//   ';NKO;C3A30(0-24h w F20)',
//   ';NKO;C3B40(0-24h w F20)',
//   ';ESI;C3B40A30(0-24h w F20)',
//   'ESI;C3A100(0-12h);B40(12-24h w F20)',
//   ';ESI;C3A100(0-24h w F20)',
//   ';NKO;C3B40A30(0-24h w F20)',
//   'NKO;C3A100(0-12h);B40(12-24h w F20)',
//   ';NKO;C3A100(0-24h w F20)',
//   ';ESI;C3A100(0-24h wo F20)',
//   ';ESI;C3B40A1(0-24h w F20) rep1',
//   ';ESI;C3B40A1(0-24h w F20) rep2',
//   ';NKO;C3A100(0-24h wo F20)',
//   ';NKO;C3B40A1(0-24h w F20) rep1',
//   ';NKO;C3B40A1(0-24h w F20) rep2',
// ]
const condition_list = [
  'C3A100(0-12h);A100B40(12-24h);B40+SB(24-48h in mstarF20)',
  'C3A100(0-12h);A100B40(12-24h);B40(24-48h in mstarF20)',
  ';C3B40(0-24h);A100B40(24-48h in mstarF20)',

  'C3A100(0-12h);A100B40(12-24h);A100+LDN(24-48h in mstar)',
  ';C3A30(0-24h);A100+LDN(24-48h in mstar)',
  ';C3B40(0-24h);A100+LDN(24-48h in mstar)',

  ';C3B40A30(0-24h);B40(24-48h in mstarF20)',
  'C3A100(0-12h);B40(12-24h);B40(24-48h in mstarF20)',
  ';C3A100(0-24h);B40(24-48h in mstarF20)',

  ';C3B40A30(0-24h);A100+LDN(24-48h in mstar)',
  'C3A100(0-12h);B40(12-24h);A100+LDN(24-48h in mstar)',
  ';C3A100(0-24h);A100+LDN(24-48h in mstar)',

  ';C3A100(0-24h);B40+SB(24-48h in mstarF20)',
  ';C3B40A1(0-24h);B40(24-48h in mstarF20)',
  ';C3B40A1(0-24h);B40A1(24-48h in mstarF20)',

  'C3A100(0-24h no F20);A100+LDN(24-48h in mstar)',
  'C3B40A1(0-24h);A100+LDN(24-48h in mstar) rep1',
  'C3B40A1(0-24h);A100+LDN(24-48h in mstar) rep2'
]
// const condition_list = [
//   'mCA mB2 (well A1)',
//   'mCA mB4 (well A2)',
//   'mstarCA mstarB4 (well A3)',
//   'mstarCA mstarFB4 (well A4)',
//   'mstarFCA mstarB4 (well A5)',
//   'mstarFCA mstarFB4 (well A6)',
//   'mstarFCA mstarFB4 (well B1)',
//   'mstarFCA mstarB4 (well B2)',
//   'mstarCA mstarFB4 (well B3)',
//   'mstarCA mstarB4 (well B4)',
//   'mCA mB4 (well B5)',
//   'mCA mB2 (well B6)'
// ]
// const condition_list = [
//   "C3 A30 rep1",
//   "C3 A30 rep2",
//   "C6 A30 B40 rep1",
//   "C6 A30 B40 rep2",
//   "C6 B40 rep1",
//   "C6 B40 rep2",
//   "C3 A100 rep1",
//   "C3 A100 rep2",
//   "C3 A100 rep3",
//   "C3 A100 rep4",
//   "C6 A30 rep1",
//   "C6 A30 rep2",
//   "C3 A30 B40 rep1",
//   "C3 A30 B40 rep2",
//   "C3 B40 rep1",
//   "C3 B40 rep2",
//   "B40 rep1",
//   "B40 rep2"
// ];
// const condition_list = [
//   ";PGP1 mCA mB rep1",
//   ";PGP1 mCA mB rep2",
//   ";PGP1 mstarCA mstarB rep1",
//   ";PGP1 mstarCA mstarB rep2",
//   ";PGP1 mstarFCA mstarB rep1",
//   ";PGP1 mstarFCA mstarB rep2",
//   ";PGP1 mstarCA mstarFB rep1",
//   ";PGP1 mstarCA mstarFB rep2",
//   ";PGP1 mstarFCA mstarFB rep1",
//   ";PGP1 mstarFCA mstarFB rep2",
//   ";SOS mCA mB rep1",
//   ";SOS mCA mB rep2",
//   ";SOS mstarCA mstarB rep1",
//   ";SOS mstarCA mstarB rep2",
//   "SOS mstarDOX MEKi CA; mstarDOX MEKi B(0h) rep1",
//   "SOS mstarDOX MEKi CA; mstarDOX MEKi B(0h) rep2",
//   "SOS mstarDOX MEKi CA; mstarDOX MEKi B(3h) rep1",
//   "SOS mstarDOX MEKi CA; mstarDOX MEKi B(3h) rep2",
// ];
// const condition_list = [
//   "imgs/exp7/mip_montage/PGP1 mCA mB rep1",
//   "imgs/exp7/mip_montage/PGP1 mCA mB rep2",
//   'PGC_endo/mip_montage/mCA mB4 (well A2)',
//   'PGC_endo/mip_montage/mCA mB4 (well B5)',
//   "imgs/exp7/mip_montage/PGP1 mstarCA mstarB rep1",
//   "imgs/exp7/mip_montage/PGP1 mstarCA mstarB rep2",
//   'PGC_endo/mip_montage/mstarCA mstarB4 (well A3)',
//   'PGC_endo/mip_montage/mstarCA mstarB4 (well B4)',
// ]
const imgs = [];
for (var i = 0; i < condition_list.length; i++) {
  imgs[i] = folder_path + "/" + prefix + condition_list[i] + postfix;
};

const channelColors = [
  [0, 0, 0, 50], // ligth gray
  [0, 100, 100, 0], // Red
  [100, 0, 100, 0], // Green
  [100, 100, 0, 0], // Blue
];
const textGap = 20;
const sideBarFontSize = 20;
const titleFontSize = 30;
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
  name: "title",
  model: ColorModel.process,
  colorValue: titleFontColor,
});
app.activeDocument.colors.add({
  name: "coolGray",
  model: ColorModel.process,
  colorValue: [0, 0, 0, 20],
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

myPage.rectangles.add({
  geometricBounds: [margin / 2, margin / 2, myDoc.documentPreferences.pageHeight - margin / 2, myDoc.documentPreferences.pageWidth - margin / 2],
  strokeWeight: 5,
  strokeColor: "coolGray",
  fillColor: "None",
});

if (sideBarWidth > 0) {
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
}

// Add title text
if (titleBarHeight > 0) {
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
}

var cropTop = 50; // Top crop
var cropBottom = 50; // Bottom crop
var cropLeft = 50; // Left crop
var cropRight = 50; // Right crop

// Add rectangular frames for each subgrid
img_ctr = 0;
for (var row = 0; row < nrow; row++) {
  for (var col = 0; col < ncol; col++) {
    // Calculate position for each subgrid
    var top = margin + titleBarHeight + row * (subGridHeight + gap);
    var left = margin + col * (subGridWidth + gap);
    var bottom = top + subGridHeight;
    var right = left + subGridWidth;

    // Create rectangle frame
    var subGridFrame = myPage.rectangles.add({
      geometricBounds: [top, left, bottom, right],
      strokeWeight: 0.5,
      strokeColor: "Black",
      fillColor: "None",
    });

    subGridFrame.place(
      File(imgs[img_ctr])
    );

    subGridFrame.fit(FitOptions.PROPORTIONALLY);

    subGridFrame.frameFittingOptions.topCrop = cropTop;
    subGridFrame.frameFittingOptions.bottomCrop = cropBottom;
    subGridFrame.frameFittingOptions.leftCrop = cropLeft;
    subGridFrame.frameFittingOptions.rightCrop = cropRight;

    img_ctr++;
  }
}
