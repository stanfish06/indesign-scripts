#include "./classes/grids.jsx";
#include "./methods/setup.jsx";

const supTitleBarHeight = 0;
const titleBarHeight = 40;
const subGridWidth = 325;
const subGridHeight = 300;
const gridAxesLabelFontSize = 15;
const margin = 10;
// margins for left, right, bottom, top
const gap = 10;
const subGridFrameWidth = 5;
const subGridOffset = 5;
const cropTop = 0; // Top crop
const cropBottom = 0; // Bottom crop
const cropLeft = 100; // Left crop
const cropRight = 100; // Right crop
const textGap = 20;
const sideBarFontSize = 20;
const titleFontSize = 23;
const titleFontColor = 'black';
const textBox = [80, 40];
const mainTitle = "";

/**
 * Typical Usage:
 *   1. Define one or more grids inside an array:
 *        const gridList = [
 *          new subGrid(
 *            nrow, ncol,                 // number of rows, columns
 *            title,                      // grid title (optional)
 *            channelNames, channelColors,// side bar labels + colors
 *            condition_list,             // array of image/condition names
 *            folder_path, prefix, postfix, // image folder + file naming
 *            gridFrameColor,             // stroke color for grid border
 *            byRow,                      // fill order (true=row-wise, false=col-wise)
 *            xlabel_type, xlabels,       // x-axis label type and values
 *            ylabel_type, ylabels,       // y-axis label type and values
 *            gridMargin,                 // [left, right, bottom, top] margins
 *            strokeType                  // InDesign stroke style ("Solid", etc.)
 *          )
 *        ];
 *
 *   2. Attach child grids if needed:
 *        gridList[0].setChildGrid(gridList[1], "bottomLeft");
 *      Valid positions: "rightTop", "rightBottom", "bottomLeft", "bottomRight".
**/
const gridList = [
  new subGrid(
    1,
    7,
    "ESI PGC, varying day-2 activin dose",
    ["DAPI", "EOMES", "TFAP2C", "SOX17"],
    ["lightGray", "red", "green", "blue"],
    [
      'C6B50;B50A1;B50IWP2 (20k)',
      'C6B50;B50A1;B50IWP2A1 (20k)',
      'C6B50;B50A1;B50IWP2A3 (20k)',
      'C6B50;B50A1;B50IWP2A10 (20k)',
      'C6B50;B50A1;B50IWP2A10 (20k) (rep2)',
      'C6B50;B50A1;B50IWP2A30 (20k)',
      'C6B50;B50A1;B50IWP2A100 (20k)',
    ],
    "C:/Users/zhiyu/OneDrive - Umich/dump/2025-09-01/exp26/20k/scatter",
    "TFAP2C_EOMES_",
    "_scatter_SOX17.png",
    "blockc_521",
    false,
    "",
    [],
    "",
    [],
    [0, 0, 0, 0],
    "Dashed",
  )
];
// TODO: bug: adding y labels to the last column appends extra space
// Example:
// gridList[0].setChildGrid(gridList[1], "bottomLeft");

// setup and draw grid
const rootGrid = 0;
const config = {
  supTitleBarHeight: supTitleBarHeight,
  titleBarHeight: titleBarHeight,
  subGridWidth: subGridWidth,
  subGridHeight: subGridHeight,
  gridAxesLabelFontSize: gridAxesLabelFontSize,
  margin: margin,
  gap: gap,
  subGridFrameWidth: subGridFrameWidth,
  subGridOffset: subGridOffset,
  cropTop: cropTop,
  cropBottom: cropBottom,
  cropLeft: cropLeft,
  cropRight: cropRight,
  textGap: textGap,
  sideBarFontSize: sideBarFontSize,
  titleFontSize: titleFontSize,
  titleFontColor: titleFontColor,
  textBox: textBox,
  mainTitle: mainTitle,
  rootGrid: rootGrid,
};
const pageSize = getPageSize(gridList[rootGrid], config);
config["pageSize"] = pageSize;
doc = setup(app, config);
drawGrid(gridList[rootGrid], doc[0], doc[1], config);
