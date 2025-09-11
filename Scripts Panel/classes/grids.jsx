// arrange the subgrids
// TODO: indicate well position (e.g. a 3 by 6 grid and highlight the position)
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
  gridMargin,
  strokeType,
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
  this.xlabel_type = xlabel_type;
  this.xlabels = xlabels;
  this.ylabel_type = ylabel_type;
  this.ylabels = ylabels;
  this.gridMargin = gridMargin;
  this.strokeType = strokeType;
}

subGrid.prototype.setChildGrid = function (childGrid, position, config) {
  const sideBarWidth = 0;
  if (position == "rightTop") {
    this.rightTop = childGrid;
    childGrid.origin_x = this.origin_x + this.ncol * config.subGridWidth + (this.ncol - 1) * config.gap + config.gap + sideBarWidth + this.gridMargin[0] + this.gridMargin[1];
    childGrid.origin_y = this.origin_y;
  } else if (position == "rightBottom") {
    this.rightBottom = childGrid;
    childGrid.origin_x =
      this.origin_x + this.ncol * config.subGridWidth + (this.ncol - 1) * config.gap + config.gap + sideBarWidth + this.gridMargin[0] + this.gridMargin[1];
    childGrid.origin_y =
      this.origin_y + this.nrow * config.subGridHeight + (this.nrow - 1) * config.gap + config.gap + config.titleBarHeight + this.gridMargin[2] + this.gridMargin[3];
    childGrid.origin_y = childGrid.origin_y - (childGrid.nrow * config.subGridHeight + (childGrid.nrow - 1) * config.gap + config.gap + config.titleBarHeight + childGrid.gridMargin[2] + childGrid.gridMargin[3]);
  } else if (position == "bottomLeft") {
    this.bottomLeft = childGrid;
    childGrid.origin_x = this.origin_x;
    childGrid.origin_y =
      this.origin_y + this.nrow * config.subGridHeight + (this.nrow - 1) * config.gap + config.gap + config.titleBarHeight + this.gridMargin[2] + this.gridMargin[3];
  } else if (position == "bottomRight") {
    this.bottomRight = childGrid;
    childGrid.origin_x =
      this.origin_x + this.ncol * config.subGridWidth + (this.ncol - 1) * config.gap - childGrid.ncol * config.subGridWidth - (childGrid.ncol - 1) * config.gap + this.gridMargin[0] + this.gridMargin[1];
    childGrid.origin_y =
      this.origin_y + this.nrow * config.subGridHeight + (this.nrow - 1) * config.gap + config.gap + config.titleBarHeight + this.gridMargin[2] + this.gridMargin[3];
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
      sz3[0] + sideBarWidth + grid.gridMargin[0] + grid.gridMargin[1]
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
    var gridOrigin_x = grid.origin_x + config.margin;
    var gridOrigin_y = grid.origin_y + config.margin + config.supTitleBarHeight;
    const gridWidth = grid.ncol * config.subGridWidth + (grid.ncol - 1) * config.gap + sideBarWidth + grid.gridMargin[0] + grid.gridMargin[1];
    const gridHeight = grid.nrow * config.subGridHeight + (grid.nrow - 1) * config.gap + config.titleBarHeight + grid.gridMargin[2] + grid.gridMargin[3];
    const gridRect = myPage.rectangles.add({
      geometricBounds: [
        gridOrigin_y,
        gridOrigin_x,
        gridOrigin_y + gridHeight,
        gridOrigin_x + gridWidth,
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
    gridOrigin_x = gridOrigin_x + config.subGridOffset;
    gridOrigin_y = gridOrigin_y + config.subGridOffset;

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
          var subGridOrigin_x = gridOrigin_x + j * (config.subGridWidth + config.gap) + grid.gridMargin[0];
          var subGridOrigin_y = gridOrigin_y + i * (config.subGridHeight + config.gap) + config.titleBarHeight + grid.gridMargin[3];
        } else {
          var subGridOrigin_x = gridOrigin_x + i * (config.subGridWidth + config.gap) + grid.gridMargin[0];
          var subGridOrigin_y = gridOrigin_y + j * (config.subGridHeight + config.gap) + config.titleBarHeight + grid.gridMargin[3];
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
        var frameShrink_x = config.subGridOffset * 2;
        var frameShrink_y = config.subGridOffset * 2;
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
            subGridOrigin_y + config.subGridHeight - frameShrink_y,
            subGridOrigin_x + config.subGridWidth - frameShrink_x,
          ],
          fillColor: myDoc.swatches.item("Paper"),
          strokeWeight: 0.5,
          strokeColor: "Black",
        });

        if (grid.ylabel_type == "time") {
          if ((grid.byRow && j == 0) || (!grid.byRow && i == 0)) {
            var radius = grid.gridMargin[0] * 0.25;
            var cx = gridOrigin_x + grid.gridMargin[0] * 0.5;
            var cy = subGridOrigin_y + config.subGridHeight * 0.5;
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
                cy + radius * 1.2,
                cx - textBox[0] * 0.5,
                cy + radius * 1.2 + textBox[1],
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
            titleTextFrame.texts[0].pointSize = gridAxesLabelFontSize;
            titleTextFrame.parentStory.justification = Justification.CENTER_ALIGN;
            titleTextFrame.fit(FitOptions.FRAME_TO_CONTENT);
          }
        } else if (grid.ylabel_type == "stain_round") {
          if ((grid.byRow && j == 0) || (!grid.byRow && i == 0)) {
            var armLength = grid.gridMargin[0] * 0.6;
            var cx = gridOrigin_x + grid.gridMargin[0] * 0.45;
            var cy = subGridOrigin_y + subGridHeight * 0.45;
            var stem = myPage.graphicLines.add();
            stem.paths[0].entirePath = [[cx, cy], [cx, cy + armLength * 0.8]];
            stem.strokeWeight = 4;
            stem.endCap = EndCap.ROUND_END_CAP;
            stem.endJoin = EndJoin.ROUND_END_JOIN;

            var leftArm = myPage.graphicLines.add();
            leftArm.paths[0].entirePath = [[cx, cy], [cx - armLength * 0.7, cy - armLength * 0.7]];
            leftArm.strokeWeight = 4;
            leftArm.endCap = EndCap.ROUND_END_CAP;
            leftArm.endJoin = EndJoin.ROUND_END_JOIN;

            var circleRadius = armLength * 0.4;
            var circleCx = cx + armLength * 0.45;
            var circleCy = cy - armLength * 0.45;
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
                circleCy - circleRadius * 0.35,
                circleCx - textBox[0] * 0.5,
                circleCy - circleRadius * 0.35 + textBox[1],
                circleCx + textBox[0] * 0.5
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
            var radius = grid.gridMargin[3] * 0.75;
            var cx = subGridOrigin_x + config.subGridWidth * 0.5
            var cy = subGridOrigin_y - radius - config.textBox[1] * 0.5;
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
                cy + radius * 1.2,
                cx - config.textBox[0] * 0.5,
                cy + radius * 1.2 + textBox[1],
                cx + config.textBox[0] * 0.5
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
      titleTextFrame.texts[0].pointSize = config.titleFontSize;
      titleTextFrame.textColumns.everyItem().fillColor = "black";
      titleTextFrame.fit(FitOptions.FRAME_TO_CONTENT);
    }
    if (grid.xlabel_type == "dose") {
      grad_trig = myPage.polygons.add();
      grad_trig.paths[0].entirePath = [
        [gridOrigin_x + grid.gridMargin[0] + subGridWidth * 0.5, gridOrigin_y + config.titleBarHeight + grid.gridMargin[3]],
        [gridOrigin_x + gridWidth - subGridWidth * 0.5, gridOrigin_y + config.titleBarHeight + grid.gridMargin[3]],
        [gridOrigin_x + gridWidth - subGridWidth * 0.5, gridOrigin_y + config.titleBarHeight + grid.gridMargin[3] * 0.5]
      ];
      grad_trig.fillColor = "black";
      var grid_trig_width = gridOrigin_x + gridWidth - subGridWidth * 0.5 - (gridOrigin_x + grid.gridMargin[0] + subGridWidth * 0.5);
      for (var i = 0; i < grid.xlabels.length; i++) {
        var titleTextFrame = myPage.textFrames.add({
          geometricBounds: [
            gridOrigin_y + subGridOffset + config.titleBarHeight,
            gridOrigin_x + grid.gridMargin[0] + subGridWidth * 0.5 + (subGridWidth + config.gap) * i - config.textBox[0] * 0.5,
            gridOrigin_y + subGridOffset + config.titleBarHeight + config.textBox[1],
            gridOrigin_x + grid.gridMargin[0] + subGridWidth * 0.5 + (subGridWidth + config.gap) * i + config.textBox[0] * 0.5
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
      var y_start = gridOrigin_y + config.titleBarHeight + grid.gridMargin[3] + config.subGridHeight * 0.5;
      var y_end = gridOrigin_y + config.titleBarHeight + grid.gridMargin[3] + (grid.nrow - 1) * (config.subGridHeight + config.gap) + config.subGridHeight * 0.5;

      grad_trig.paths[0].entirePath = [
        [gridOrigin_x + grid.gridMargin[0] * 0.5, y_start],
        [gridOrigin_x + grid.gridMargin[0], y_start],
        [gridOrigin_x + grid.gridMargin[0], y_end]
      ];
      grad_trig.fillColor = "black";

      for (var i = 0; i < grid.ylabels.length; i++) {
        var y_center = gridOrigin_y + config.titleBarHeight + grid.gridMargin[3] + i * (config.subGridHeight + config.gap) + config.subGridHeight * 0.5;
        var x_center = gridOrigin_x + grid.gridMargin[0] * 0.5;

        var titleTextFrame = myPage.textFrames.add({
          geometricBounds: [
            y_center - config.textBox[1] * 0.5,
            x_center - config.textBox[0] * 0.75,
            y_center + config.textBox[1] * 0.5,
            x_center + config.textBox[0] * 0.25
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
