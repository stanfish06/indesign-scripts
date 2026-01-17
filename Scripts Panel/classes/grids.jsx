// arrange the subgrids
// TODO: indicate well position (e.g. a 3 by 6 grid and highlight the position)

// Global error tracking array
var missingImages = [];

// Layout calculation constants
var ICON_RADIUS_FRACTION = 0.25;        // Icon radius as fraction of margin
var ICON_CENTER_POSITION = 0.5;         // Icon center position in cell (0.5 = middle)
var ICON_ARM_LENGTH_FRACTION = 0.6;     // Antibody icon arm length fraction
var ICON_OFFSET_FRACTION = 0.45;        // Icon position offset from margin
var MARGIN_PADDING_FRACTION = 0.05;     // Small padding as fraction of margin
var TEXT_OFFSET_MULTIPLIER = 1.2;       // Text label offset multiplier from icon edge
var CLOCK_HAND_SHORT = 0.4;             // Clock short hand length (fraction of radius)
var CLOCK_HAND_LONG = 0.6;              // Clock long hand length (fraction of radius)
var ANTIBODY_STEM_HEIGHT = 0.8;         // Antibody stem height (fraction of arm length)
var ANTIBODY_ARM_ANGLE = 0.7;           // Antibody arm angle factor
var ANTIBODY_CIRCLE_RADIUS = 0.4;       // Antibody circle radius (fraction of arm length)
var ANTIBODY_CIRCLE_OFFSET = 0.45;      // Antibody circle center offset

function subGrid(
  nrow,
  ncol,
  title,
  channelNames,
  channelColors,
  conditionList,
  folderPath,
  prefix,
  postfix,
  gridFrameColor,
  byRow,
  xlabel_type,
  xlabels,
  ylabel_type,
  ylabels,
  gridMargin,
  strokeType,
  wellIndicator  // Optional: well plate indicator configuration
) {
  this.rightTop = null;
  this.rightBottom = null;
  this.bottomLeft = null;
  this.bottomRight = null;
  this.originX = 0;
  this.originY = 0;
  this.title = title;
  this.channelNames = channelNames;
  this.channelColors = channelColors;
  this.nrow = nrow;
  this.ncol = ncol;
  this.conditionList = conditionList;
  this.folderPath = folderPath;
  this.prefix = prefix;
  this.postfix = postfix;
  this.gridFrameColor = gridFrameColor;
  this.byRow = byRow;
  this.xlabel_type = xlabel_type;
  this.xlabels = xlabels;
  this.ylabel_type = ylabel_type;
  this.ylabels = ylabels;
  this.gridMargin = gridMargin;
  this.strokeType = strokeType;
  this.wellIndicator = wellIndicator || null;  // {enabled, plateRows, plateCols, wellPositions, position, offset, size, strokeWeight}
}

subGrid.prototype.setChildGrid = function (childGrid, position, config) {
  const sideBarWidth = 0;
  if (position == "rightTop") {
    this.rightTop = childGrid;
    childGrid.originX = this.originX + this.ncol * config.subGridWidth + (this.ncol - 1) * config.gap + config.gap + sideBarWidth + this.gridMargin[0] + this.gridMargin[1];
    childGrid.originY = this.originY;
  } else if (position == "rightBottom") {
    this.rightBottom = childGrid;
    childGrid.originX =
      this.originX + this.ncol * config.subGridWidth + (this.ncol - 1) * config.gap + config.gap + sideBarWidth + this.gridMargin[0] + this.gridMargin[1];
    childGrid.originY =
      this.originY + this.nrow * config.subGridHeight + (this.nrow - 1) * config.gap + config.gap + config.titleBarHeight + this.gridMargin[2] + this.gridMargin[3];
    childGrid.originY = childGrid.originY - (childGrid.nrow * config.subGridHeight + (childGrid.nrow - 1) * config.gap + config.gap + config.titleBarHeight + childGrid.gridMargin[2] + childGrid.gridMargin[3]);
  } else if (position == "bottomLeft") {
    this.bottomLeft = childGrid;
    childGrid.originX = this.originX;
    childGrid.originY =
      this.originY + this.nrow * config.subGridHeight + (this.nrow - 1) * config.gap + config.gap + config.titleBarHeight + this.gridMargin[2] + this.gridMargin[3];
  } else if (position == "bottomRight") {
    this.bottomRight = childGrid;
    childGrid.originX =
      this.originX + this.ncol * config.subGridWidth + (this.ncol - 1) * config.gap - childGrid.ncol * config.subGridWidth - (childGrid.ncol - 1) * config.gap + this.gridMargin[0] + this.gridMargin[1];
    childGrid.originY =
      this.originY + this.nrow * config.subGridHeight + (this.nrow - 1) * config.gap + config.gap + config.titleBarHeight + this.gridMargin[2] + this.gridMargin[3];
  }
};

function getPageSize(grid, config) {
  // these need to be integrated into config later, but no need for now
  const sideBarWidth = 0;
  if (grid == null) {
    return [-config.gap + sideBarWidth, -config.gap];
  } else {
    const sz1 = getPageSize(grid.rightTop, config);
    const sz2 = getPageSize(grid.rightBottom, config);
    const sz3 = getPageSize(grid.bottomLeft, config);
    const sz4 = getPageSize(grid.bottomRight, config);

    const bd_width = Math.max(
      sz1[0] +
      config.gap +
      grid.ncol * config.subGridWidth +
      (grid.ncol - 1) * config.gap +
      sideBarWidth + grid.gridMargin[0] + grid.gridMargin[1],
      sz2[0] +
      config.gap +
      grid.ncol * config.subGridWidth +
      (grid.ncol - 1) * config.gap +
      sideBarWidth + grid.gridMargin[0] + grid.gridMargin[1],
      sz3[0]
    );
    const bd_height = Math.max(
      sz3[1] + config.gap + grid.nrow * config.subGridHeight + (grid.nrow - 1) * config.gap + config.titleBarHeight + grid.gridMargin[2] + grid.gridMargin[3],
      sz4[1] + config.gap + grid.nrow * config.subGridHeight + (grid.nrow - 1) * config.gap + config.titleBarHeight + grid.gridMargin[2] + grid.gridMargin[3],
      sz2[1] + config.titleBarHeight + grid.gridMargin[2] + grid.gridMargin[3],
    );
    return [bd_width, bd_height];
  }
}

function drawGrid(grid, myDoc, myPage, config) {
  var myFont = app.fonts.item("Arial");
  const sideBarWidth = 0;
  if (grid == null) {
    return;
  } else {
    var gridOriginX = grid.originX + config.margin;
    var gridOriginY = grid.originY + config.margin + config.supTitleBarHeight;
    const gridWidth = grid.ncol * config.subGridWidth + (grid.ncol - 1) * config.gap + sideBarWidth + grid.gridMargin[0] + grid.gridMargin[1];
    const gridHeight = grid.nrow * config.subGridHeight + (grid.nrow - 1) * config.gap + config.titleBarHeight + grid.gridMargin[2] + grid.gridMargin[3];
    const gridRect = myPage.rectangles.add({
      geometricBounds: [
        gridOriginY,
        gridOriginX,
        gridOriginY + gridHeight,
        gridOriginX + gridWidth,
      ],
      fillColor: myDoc.swatches.item("Paper"),
      strokeColor: myDoc.swatches.item(grid.gridFrameColor),
      strokeWeight: config.subGridFrameWidth,
      strokeType: grid.strokeType,
    });
    drawGrid(grid.rightTop, myDoc, myPage, config);
    drawGrid(grid.rightBottom, myDoc, myPage, config);
    drawGrid(grid.bottomLeft, myDoc, myPage, config);
    drawGrid(grid.bottomRight, myDoc, myPage, config);
    gridOriginX = gridOriginX + config.subGridOffset;
    gridOriginY = gridOriginY + config.subGridOffset;

    var nextImgIndex = 0;
    var fillIdx1 = grid.nrow;
    var fillIdx2 = grid.ncol;
    if (!grid.byRow) {
      fillIdx1 = grid.ncol;
      fillIdx2 = grid.nrow;
    }
    for (var i = 0; i < fillIdx1; i++) {
      for (var j = 0; j < fillIdx2; j++) {
        if (nextImgIndex == grid.conditionList.length) {
          break;
        }
        if (grid.byRow) {
          var subGridOriginX = gridOriginX + j * (config.subGridWidth + config.gap) + grid.gridMargin[0];
          var subGridOriginY = gridOriginY + i * (config.subGridHeight + config.gap) + config.titleBarHeight + grid.gridMargin[3];
        } else {
          var subGridOriginX = gridOriginX + i * (config.subGridWidth + config.gap) + grid.gridMargin[0];
          var subGridOriginY = gridOriginY + j * (config.subGridHeight + config.gap) + config.titleBarHeight + grid.gridMargin[3];
        }

        var frameShrinkX = config.subGridOffset * 2;
        var frameShrinkY = config.subGridOffset * 2;

        var subGridRect = myDoc.pages.item(0).rectangles.add({
          geometricBounds: [
            subGridOriginY,
            subGridOriginX,
            subGridOriginY + config.subGridHeight - frameShrinkY,
            subGridOriginX + config.subGridWidth - frameShrinkX,
          ],
          fillColor: myDoc.swatches.item("Paper"),
          strokeWeight: 0.5,
          strokeColor: "Black",
        });

        if (grid.ylabel_type == "time") {
          if ((grid.byRow && j == 0) || (!grid.byRow && i == 0)) {
            var radius = grid.gridMargin[0] * ICON_RADIUS_FRACTION;
            var cx = gridOriginX + grid.gridMargin[0] * ICON_CENTER_POSITION;
            var cy = subGridOriginY + config.subGridHeight * ICON_CENTER_POSITION;
            var circle = myPage.ovals.add();
            circle.geometricBounds = [
              cy - radius,
              cx - radius,
              cy + radius,
              cx + radius,
            ];
            circle.strokeWeight = 4;

            line1 = myPage.graphicLines.add();
            line1.paths[0].entirePath = [[cx, cy], [cx + radius * CLOCK_HAND_SHORT, cy]];
            line2 = myPage.graphicLines.add();
            line2.paths[0].entirePath = [[cx, cy], [cx, cy - radius * CLOCK_HAND_LONG]];
            line1.strokeWeight = 4;
            line2.strokeWeight = 4;
            line1.endCap = EndCap.ROUND_END_CAP;
            line1.endJoin = EndJoin.ROUND_END_JOIN;
            line2.endCap = EndCap.ROUND_END_CAP;
            line2.endJoin = EndJoin.ROUND_END_JOIN;

            var titleTextFrame = myPage.textFrames.add({
              geometricBounds: [
                cy + radius * TEXT_OFFSET_MULTIPLIER,
                cx - textBox[0] * ICON_CENTER_POSITION,
                cy + radius * TEXT_OFFSET_MULTIPLIER + textBox[1],
                cx + textBox[0] * ICON_CENTER_POSITION
              ],
            });
            if (grid.byRow) {
              titleTextFrame.contents = grid.ylabels[i];
            } else {
              titleTextFrame.contents = grid.ylabels[j];
            }
            titleTextFrame.texts[0].appliedFont = myFont;
            titleTextFrame.texts[0].fontStyle = "Bold";
            titleTextFrame.texts[0].pointSize = gridAxesLabelFontSize;
            titleTextFrame.parentStory.justification = Justification.CENTER_ALIGN;
            titleTextFrame.fit(FitOptions.FRAME_TO_CONTENT);
          }
        } else if (grid.ylabel_type == "stain_round") {
          if ((grid.byRow && j == 0) || (!grid.byRow && i == 0)) {
            var armLength = grid.gridMargin[0] * ICON_ARM_LENGTH_FRACTION;
            var cx = gridOriginX + grid.gridMargin[0] * ICON_OFFSET_FRACTION;
            var cy = subGridOriginY + subGridHeight * ICON_OFFSET_FRACTION;
            var stem = myPage.graphicLines.add();
            stem.paths[0].entirePath = [[cx, cy], [cx, cy + armLength * ANTIBODY_STEM_HEIGHT]];
            stem.strokeWeight = 4;
            stem.endCap = EndCap.ROUND_END_CAP;
            stem.endJoin = EndJoin.ROUND_END_JOIN;

            var leftArm = myPage.graphicLines.add();
            leftArm.paths[0].entirePath = [[cx, cy], [cx - armLength * ANTIBODY_ARM_ANGLE, cy - armLength * ANTIBODY_ARM_ANGLE]];
            leftArm.strokeWeight = 4;
            leftArm.endCap = EndCap.ROUND_END_CAP;
            leftArm.endJoin = EndJoin.ROUND_END_JOIN;

            var circleRadius = armLength * ANTIBODY_CIRCLE_RADIUS;
            var circleCx = cx + armLength * ANTIBODY_CIRCLE_OFFSET;
            var circleCy = cy - armLength * ANTIBODY_CIRCLE_OFFSET;
            var circle = myPage.ovals.add();
            circle.geometricBounds = [
              circleCy - circleRadius,
              circleCx - circleRadius,
              circleCy + circleRadius,
              circleCx + circleRadius,
            ];
            circle.strokeWeight = 4;

            var rightArm = myPage.graphicLines.add();
            rightArm.paths[0].entirePath = [[cx, cy], [circleCx - circleRadius / Math.sqrt(2), circleCy + circleRadius / Math.sqrt(2)]];
            rightArm.strokeWeight = 4;
            rightArm.endCap = EndCap.ROUND_END_CAP;
            rightArm.endJoin = EndJoin.ROUND_END_JOIN;

            var titleTextFrame = myPage.textFrames.add({
              geometricBounds: [
                circleCy - circleRadius * 0.35, // Keep specific offset for antibody number positioning
                circleCx - textBox[0] * ICON_CENTER_POSITION,
                circleCy - circleRadius * 0.35 + textBox[1],
                circleCx + textBox[0] * ICON_CENTER_POSITION
              ],
            });
            if (grid.byRow) {
              titleTextFrame.contents = grid.ylabels[i];
            } else {
              titleTextFrame.contents = grid.ylabels[j];
            }
            titleTextFrame.texts[0].appliedFont = myFont;
            titleTextFrame.texts[0].fontStyle = "Bold";
            titleTextFrame.texts[0].pointSize = gridAxesLabelFontSize;
            titleTextFrame.parentStory.justification = Justification.CENTER_ALIGN;
            titleTextFrame.fit(FitOptions.FRAME_TO_CONTENT);
          }
        }

        if (grid.xlabel_type == "time") {
          if ((grid.byRow && i == 0) || (!grid.byRow && j == 0)) {
            var radius = grid.gridMargin[3] * 0.75; // Specific sizing for top margin
            var cx = subGridOriginX + config.subGridWidth * ICON_CENTER_POSITION;
            var cy = subGridOriginY - radius - config.textBox[1] * 0.75; // Position above grid
            var circle = myPage.ovals.add();
            circle.geometricBounds = [
              cy - radius,
              cx - radius,
              cy + radius,
              cx + radius,
            ];
            circle.strokeWeight = 4;

            line1 = myPage.graphicLines.add();
            line1.paths[0].entirePath = [[cx, cy], [cx + radius * CLOCK_HAND_SHORT, cy]];
            line2 = myPage.graphicLines.add();
            line2.paths[0].entirePath = [[cx, cy], [cx, cy - radius * CLOCK_HAND_LONG]];
            line1.strokeWeight = 4;
            line2.strokeWeight = 4;
            line1.endCap = EndCap.ROUND_END_CAP;
            line1.endJoin = EndJoin.ROUND_END_JOIN;
            line2.endCap = EndCap.ROUND_END_CAP;
            line2.endJoin = EndJoin.ROUND_END_JOIN;

            var titleTextFrame = myPage.textFrames.add({
              geometricBounds: [
                cy + radius * TEXT_OFFSET_MULTIPLIER,
                cx - config.textBox[0] * ICON_CENTER_POSITION,
                cy + radius * TEXT_OFFSET_MULTIPLIER + textBox[1],
                cx + config.textBox[0] * ICON_CENTER_POSITION
              ],
            });
            if (grid.byRow) {
              titleTextFrame.contents = grid.xlabels[j];
            } else {
              titleTextFrame.contents = grid.xlabels[i];
            }
            titleTextFrame.texts[0].appliedFont = myFont;
            titleTextFrame.texts[0].fontStyle = "Bold";
            titleTextFrame.texts[0].pointSize = config.gridAxesLabelFontSize;
            titleTextFrame.parentStory.justification = Justification.CENTER_ALIGN;
            titleTextFrame.fit(FitOptions.FRAME_TO_CONTENT);
          }
        }

        var imagePath = grid.folderPath +
          "/" +
          grid.prefix +
          grid.conditionList[nextImgIndex] +
          grid.postfix;
        var imageFile = File(imagePath);

        try {
          if (!imageFile.exists) {
            missingImages.push({
              path: imagePath,
              condition: grid.conditionList[nextImgIndex],
              gridTitle: grid.title
            });
          } else {
            subGridRect.place(imageFile);
          }
        } catch (e) {
          missingImages.push({
            path: imagePath,
            condition: grid.conditionList[nextImgIndex],
            gridTitle: grid.title,
            error: e.toString()
          });
        }
        nextImgIndex++;
        subGridRect.fit(FitOptions.PROPORTIONALLY);
        subGridRect.frameFittingOptions.fittingAlignment =
          AnchorPoint.BOTTOM_CENTER_ANCHOR;

        subGridRect.frameFittingOptions.topCrop = cropTop;
        subGridRect.frameFittingOptions.bottomCrop = cropBottom;
        subGridRect.frameFittingOptions.leftCrop = cropLeft;
        subGridRect.frameFittingOptions.rightCrop = cropRight;

        if (grid.wellIndicator && grid.wellIndicator.enabled) {
          drawWellIndicator(myPage, subGridRect, grid.wellIndicator, nextImgIndex - 1, grid);
        }
      }
    }

    if (titleBarHeight > 0) {
      var titleTextFrame = myPage.textFrames.add({
        geometricBounds: [
          gridOriginY,
          gridOriginX,
          gridOriginY + titleBarHeight,
          gridOriginX + gridWidth - subGridOffset * 2,
        ],
      });
      titleTextFrame.contents = grid.title;
      titleTextFrame.texts[0].appliedFont = myFont;
      titleTextFrame.texts[0].fontStyle = "Bold";
      titleTextFrame.texts[0].pointSize = config.titleFontSize;
      titleTextFrame.textColumns.everyItem().fillColor = "black";
      titleTextFrame.fit(FitOptions.FRAME_TO_CONTENT);
    }
    if (grid.xlabel_type == "dose") {
      grad_trig = myPage.polygons.add();
      grad_trig.paths[0].entirePath = [
        [gridOriginX + grid.gridMargin[0] + subGridWidth * ICON_CENTER_POSITION, gridOriginY + config.titleBarHeight + grid.gridMargin[3]],
        [gridOriginX + gridWidth - subGridWidth * ICON_CENTER_POSITION, gridOriginY + config.titleBarHeight + grid.gridMargin[3]],
        [gridOriginX + gridWidth - subGridWidth * ICON_CENTER_POSITION, gridOriginY + config.titleBarHeight + grid.gridMargin[3] * ICON_CENTER_POSITION]
      ];
      grad_trig.fillColor = "black";
      var grid_trig_width = gridOriginX + gridWidth - subGridWidth * ICON_CENTER_POSITION - (gridOriginX + grid.gridMargin[0] + subGridWidth * ICON_CENTER_POSITION);
      for (var i = 0; i < grid.xlabels.length; i++) {
        var titleTextFrame = myPage.textFrames.add({
          geometricBounds: [
            gridOriginY + subGridOffset + config.titleBarHeight - config.textBox[0] * ICON_CENTER_POSITION,
            gridOriginX + grid.gridMargin[0] + subGridWidth * ICON_CENTER_POSITION + (subGridWidth + config.gap) * i - config.textBox[0] * ICON_CENTER_POSITION,
            gridOriginY + subGridOffset + config.titleBarHeight + config.textBox[1],
            gridOriginX + grid.gridMargin[0] + subGridWidth * ICON_CENTER_POSITION + (subGridWidth + config.gap) * i + config.textBox[0] * ICON_CENTER_POSITION
          ],
        });
        titleTextFrame.contents = grid.xlabels[i];
        titleTextFrame.texts[0].appliedFont = myFont;
        titleTextFrame.texts[0].fontStyle = "Bold";
        titleTextFrame.texts[0].pointSize = gridAxesLabelFontSize;
        titleTextFrame.parentStory.justification = Justification.CENTER_ALIGN;
        titleTextFrame.fit(FitOptions.FRAME_TO_CONTENT);
      }
    }

    if (grid.ylabel_type == "dose") {
      var grad_trig = myPage.polygons.add();
      var y_start = gridOriginY + config.titleBarHeight + grid.gridMargin[3] + config.subGridHeight * ICON_CENTER_POSITION;
      var y_end = gridOriginY + config.titleBarHeight + grid.gridMargin[3] + (grid.nrow - 1) * (config.subGridHeight + config.gap) + config.subGridHeight * ICON_CENTER_POSITION;

      grad_trig.paths[0].entirePath = [
        [gridOriginX + grid.gridMargin[0] * ICON_CENTER_POSITION, y_start],
        [gridOriginX + grid.gridMargin[0], y_start],
        [gridOriginX + grid.gridMargin[0], y_end]
      ];
      grad_trig.fillColor = "black";

      for (var i = 0; i < grid.ylabels.length; i++) {
        var y_center = gridOriginY + config.titleBarHeight + grid.gridMargin[3] + i * (config.subGridHeight + config.gap) + config.subGridHeight * ICON_CENTER_POSITION;
        var x_center = gridOriginX + grid.gridMargin[0] * ICON_CENTER_POSITION;

        var titleTextFrame = myPage.textFrames.add({
          geometricBounds: [
            y_center - config.textBox[1] * ICON_CENTER_POSITION,
            x_center - config.textBox[0] * 0.75, // Keep asymmetric offset for left alignment
            y_center + config.textBox[1] * ICON_CENTER_POSITION,
            x_center + config.textBox[0] * 0.25  // Keep asymmetric offset for left alignment
          ],
        });
        titleTextFrame.contents = grid.ylabels[i];
        titleTextFrame.texts[0].appliedFont = myFont;
        titleTextFrame.texts[0].fontStyle = "Bold";
        titleTextFrame.texts[0].pointSize = gridAxesLabelFontSize;
        titleTextFrame.parentStory.justification = Justification.CENTER_ALIGN;
        titleTextFrame.fit(FitOptions.FRAME_TO_CONTENT);
      }
    }
    // TODO: refine the code
    if (grid.ylabel_type == "arrow") {
      var y_start = gridOriginY + config.titleBarHeight + grid.gridMargin[3] + config.subGridHeight * ICON_CENTER_POSITION;
      var y_end = gridOriginY + config.titleBarHeight + grid.gridMargin[3] + (grid.nrow - 1) * (config.subGridHeight + config.gap) + config.subGridHeight * ICON_CENTER_POSITION;
      var x_pos = gridOriginX + grid.gridMargin[0] * ICON_CENTER_POSITION;

      var arrow_shaft = myPage.graphicLines.add();
      arrow_shaft.paths[0].entirePath = [
        [x_pos, y_start],
        [x_pos, y_end]
      ];
      arrow_shaft.strokeWeight = 4;
      arrow_shaft.strokeColor = "black";

      var arrowhead = myPage.polygons.add();
      var arrowhead_width = grid.gridMargin[0] * 0.2;
      var arrowhead_height = config.subGridHeight * 0.1;

      arrowhead.paths[0].entirePath = [
        [x_pos, y_end],
        [x_pos - arrowhead_width, y_end - arrowhead_height],
        [x_pos + arrowhead_width, y_end - arrowhead_height]
      ];
      arrowhead.fillColor = "black";
      arrowhead.strokeWeight = 0;

      for (var i = 0; i < grid.ylabels.length; i++) {
        var y_center = gridOriginY + config.titleBarHeight + grid.gridMargin[3] + i * (config.subGridHeight + config.gap) + config.subGridHeight * ICON_CENTER_POSITION;
        var x_center = gridOriginX + grid.gridMargin[0] * ICON_CENTER_POSITION;
        var titleTextFrame = myPage.textFrames.add({
          geometricBounds: [
            y_center - config.textBox[1] * ICON_CENTER_POSITION,
            x_center - config.textBox[0],
            y_center + config.textBox[1] * ICON_CENTER_POSITION,
            x_center + config.textBox[0] * 0.25  // Keep asymmetric offset for left alignment
          ],
        });
        titleTextFrame.contents = grid.ylabels[i];
        titleTextFrame.texts[0].appliedFont = myFont;
        titleTextFrame.texts[0].fontStyle = "Bold";
        titleTextFrame.texts[0].pointSize = gridAxesLabelFontSize;
        titleTextFrame.parentStory.justification = Justification.CENTER_ALIGN;
        titleTextFrame.fit(FitOptions.FRAME_TO_CONTENT);
      }
    }
  }
}

function drawWellIndicator(myPage, imageRect, wellConfig, imgIndex, grid) {
  if (!wellConfig || !wellConfig.enabled) {
    return;
  }

  var plateRows = wellConfig.plateRows || 3;
  var plateCols = wellConfig.plateCols || 6;
  var position = wellConfig.position || "bottomRight";
  var offset = wellConfig.offset || [5, 5];
  var size = wellConfig.size || 30;
  var strokeWeight = wellConfig.strokeWeight || 0.5;
  var bgOpacity = wellConfig.bgOpacity || 80;
  var checkColor = wellConfig.checkColor || "red";


  var imgBounds = imageRect.geometricBounds;
  var imgTop = imgBounds[0];
  var imgLeft = imgBounds[1];
  var imgBottom = imgBounds[2];
  var imgRight = imgBounds[3];


  var indicatorX, indicatorY;
  switch (position) {
    case "topLeft":
      indicatorX = imgLeft + offset[0];
      indicatorY = imgTop + offset[1];
      break;
    case "topRight":
      indicatorX = imgRight - size - offset[0];
      indicatorY = imgTop + offset[1];
      break;
    case "bottomLeft":
      indicatorX = imgLeft + offset[0];
      indicatorY = imgBottom - size - offset[1];
      break;
    case "bottomRight":
    default:
      indicatorX = imgRight - size - offset[0];
      indicatorY = imgBottom - size - offset[1];
      break;
  }


  var bgRect = myPage.rectangles.add({
    geometricBounds: [
      indicatorY,
      indicatorX,
      indicatorY + size,
      indicatorX + size
    ],
    fillColor: "Paper",
    strokeWeight: 0
  });
  bgRect.transparencySettings.blendingSettings.opacity = bgOpacity;


  var cellWidth = size / plateCols;
  var cellHeight = size / plateRows;


  for (var i = 0; i <= plateRows; i++) {
    var line = myPage.graphicLines.add();
    line.paths[0].entirePath = [
      [indicatorX, indicatorY + i * cellHeight],
      [indicatorX + size, indicatorY + i * cellHeight]
    ];
    line.strokeWeight = strokeWeight;
    line.strokeColor = "Black";
  }

  for (var j = 0; j <= plateCols; j++) {
    var line = myPage.graphicLines.add();
    line.paths[0].entirePath = [
      [indicatorX + j * cellWidth, indicatorY],
      [indicatorX + j * cellWidth, indicatorY + size]
    ];
    line.strokeWeight = strokeWeight;
    line.strokeColor = "Black";
  }



  if (wellConfig.wellPositions && imgIndex < wellConfig.wellPositions.length) {
    var wellPos = wellConfig.wellPositions[imgIndex];
    if (wellPos.length == 0) {
      return;
    }
    var wellRow = wellPos[0];
    var wellCol = wellPos[1];


    var wellCenterX = indicatorX + (wellCol + ICON_CENTER_POSITION) * cellWidth;
    var wellCenterY = indicatorY + (wellRow + ICON_CENTER_POSITION) * cellHeight;


    var checkSize = Math.min(cellWidth, cellHeight) * 0.6;


    var check1 = myPage.graphicLines.add();
    check1.paths[0].entirePath = [
      [wellCenterX - checkSize * 0.3, wellCenterY],
      [wellCenterX - checkSize * 0.1, wellCenterY + checkSize * 0.3]
    ];
    check1.strokeWeight = strokeWeight * 3;
    check1.strokeColor = checkColor;
    check1.endCap = EndCap.ROUND_END_CAP;


    var check2 = myPage.graphicLines.add();
    check2.paths[0].entirePath = [
      [wellCenterX - checkSize * 0.1, wellCenterY + checkSize * 0.3],
      [wellCenterX + checkSize * 0.35, wellCenterY - checkSize * 0.35]
    ];
    check2.strokeWeight = strokeWeight * 3;
    check2.strokeColor = checkColor;
    check2.endCap = EndCap.ROUND_END_CAP;
  }
}

// Function to display error summary
function showErrorReport() {
  if (missingImages.length === 0) {
    return;
  }

  var errorMessage = "Image Loading Report\n";
  errorMessage += "===================\n\n";
  errorMessage += "Failed to load " + missingImages.length + " image(s):\n\n";

  for (var i = 0; i < missingImages.length; i++) {
    errorMessage += (i + 1) + ". Grid: \"" + missingImages[i].gridTitle + "\"\n";
    errorMessage += "   Condition: " + missingImages[i].condition + "\n";
    errorMessage += "   Path: " + missingImages[i].path + "\n";
    if (missingImages[i].error) {
      errorMessage += "   Error: " + missingImages[i].error + "\n";
    }
    errorMessage += "\n";
  }

  errorMessage += "\nPlease check:\n";
  errorMessage += "- File paths are correct\n";
  errorMessage += "- Image files exist at the specified locations\n";
  errorMessage += "- File names match the condition names + prefix/postfix\n";

  alert(errorMessage);
}
