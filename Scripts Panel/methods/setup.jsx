#include "../constants/colors.jsx";

function setup(app, config) {
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
    config.pageSize[1] + 2 * config.margin + config.supTitleBarHeight;
  const sideBarWidth = 0;
  const supSideBarWidth = 0;
  myDoc.documentPreferences.pageWidth = config.pageSize[0] - sideBarWidth + 2 * config.margin + supSideBarWidth;

  var myMasterSpread = myDoc.masterSpreads.item(0);
  var myMarginPreferences = myMasterSpread.pages.item(0).marginPreferences;

  //Now set up the page margins and columns.
  myMarginPreferences.left = config.margin;
  myMarginPreferences.top = config.margin;
  myMarginPreferences.right = config.margin;
  myMarginPreferences.bottom = config.margin;

  var myPage = myDoc.pages[0];
  myPage.rectangles.add({
    geometricBounds: [
      config.margin / 3,
      config.margin / 3,
      myDoc.documentPreferences.pageHeight - config.margin / 3,
      myDoc.documentPreferences.pageWidth - config.margin / 3,
    ],
    strokeWeight: config.subGridFrameWidth,
    strokeColor: "coolGray",
    fillColor: "None",
  });


  // Add title text
  if (supTitleBarHeight > 0) {
    var titleTextFrame = myPage.textFrames.add({
      geometricBounds: [
        config.margin,
        config.margin,
        config.margin + config.supTitleBarHeight,
        config.margin + 1000,
      ],
    });
    titleTextFrame.contents = config.mainTitle
    titleTextFrame.texts[0].appliedFont = config.myFont;
    titleTextFrame.texts[0].fontStyle = "Bold";
    titleTextFrame.texts[0].pointSize = config.titleFontSize;
    titleTextFrame.textColumns.everyItem().fillColor = "black";
    titleTextFrame.fit(FitOptions.FRAME_TO_CONTENT);
  }
  return [myDoc, myPage];

  // if (supSideBarWidth > 0) {
  //   // Add channel names to the sidebar
  //   var yPosition = config.margin + config.supTitleBarHeight + config.textGap / 2;
  //   var textFrame = myPage.textFrames.add({
  //     geometricBounds: [
  //       config.yPosition - config.textGap / 2, // top
  //       config.pageSize[0] + 20, // left
  //       config.yPosition + config.textGap / 2, // bottom
  //       config.pageSize[0] + config.supSideBarWidth + 30, // right
  //     ],
  //   });
  //   // Add the channel name text
  //   // textFrame.contents = "channels:";
  //   textFrame.contents = "E6: duplicate 1";
  //   // Set the text formatting
  //   textFrame.texts[0].appliedFont = myFont;
  //   textFrame.texts[0].fontStyle = "Bold";
  //   textFrame.texts[0].pointSize = sideBarFontSize;
  //   textFrame.textColumns.everyItem().fillColor = "matlabOrange";
  //   // fit content to frame
  //   textFrame.fit(FitOptions.FRAME_TO_CONTENT);
  //
  //   var yPosition = yPosition + textGap;
  //   var textFrame = myPage.textFrames.add({
  //     geometricBounds: [
  //       yPosition - textGap / 2, // top
  //       pageSize[0] + 20, // left
  //       yPosition + textGap / 2, // bottom
  //       pageSize[0] + supSideBarWidth + 30, // right
  //     ],
  //   });
  //   // Add the channel name text
  //   // textFrame.contents = "channels:";
  //   textFrame.contents = "E6: duplicate 2";
  //   // Set the text formatting
  //   textFrame.texts[0].appliedFont = myFont;
  //   textFrame.texts[0].fontStyle = "Bold";
  //   textFrame.texts[0].pointSize = sideBarFontSize;
  //   textFrame.textColumns.everyItem().fillColor = "matlabDarkRed";
  //   // fit content to frame
  //   textFrame.fit(FitOptions.FRAME_TO_CONTENT);
  //
  //   var yPosition = yPosition + textGap;
  //   var textFrame = myPage.textFrames.add({
  //     geometricBounds: [
  //       yPosition - textGap / 2, // top
  //       pageSize[0] + 20, // left
  //       yPosition + textGap / 2, // bottom
  //       pageSize[0] + supSideBarWidth + 30, // right
  //     ],
  //   });
  //   // Add the channel name text
  //   // textFrame.contents = "channels:";
  //   textFrame.contents = "mTeSR: duplicate 1";
  //   // Set the text formatting
  //   textFrame.texts[0].appliedFont = myFont;
  //   textFrame.texts[0].fontStyle = "Bold";
  //   textFrame.texts[0].pointSize = sideBarFontSize;
  //   textFrame.textColumns.everyItem().fillColor = "matlabCyan";
  //   // fit content to frame
  //   textFrame.fit(FitOptions.FRAME_TO_CONTENT);
  //
  //
  //   var yPosition = yPosition + textGap;
  //   var textFrame = myPage.textFrames.add({
  //     geometricBounds: [
  //       yPosition - textGap / 2, // top
  //       pageSize[0] + 20, // left
  //       yPosition + textGap / 2, // bottom
  //       pageSize[0] + supSideBarWidth + 30, // right
  //     ],
  //   });
  //   // Add the channel name text
  //   // textFrame.contents = "channels:";
  //   textFrame.contents = "mTeSR: duplicate 2";
  //   // Set the text formatting
  //   textFrame.texts[0].appliedFont = myFont;
  //   textFrame.texts[0].fontStyle = "Bold";
  //   textFrame.texts[0].pointSize = sideBarFontSize;
  //   textFrame.textColumns.everyItem().fillColor = "matlabBlue";
  //   // fit content to frame
  //   textFrame.fit(FitOptions.FRAME_TO_CONTENT);
  // }
}
