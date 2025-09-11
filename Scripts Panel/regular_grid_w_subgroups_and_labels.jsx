#include "./classes/grids.jsx";
#include "./methods/setup.jsx";

const supTitleBarHeight = 40; // main title bar height
const supSideBarWidth = 100; // main title bar width
const titleBarHeight = 60; // subgrid title bar height
const subGridWidth = 325; // figure width
const subGridHeight = 300; // figure height
const gridAxesLabelFontSize = 15; // subgrid axis label font size
const margin = 10; // top, bottom, right, and left margin
const gap = 10; // gap between figures
const subGridFrameWidth = 5; // subgrid frame line width
const subGridOffset = 5; // subgrid margin
const cropTop = 0; // Top crop figure
const cropBottom = 0; // Bottom crop figure
const cropLeft = 0; // Left crop figure
const cropRight = 0; // Right crop figure
const textGap = 20; // text grap in side bar
const sideBarFontSize = 20; // side bar text font size
const titleFontSize = 23; // subgrid title font size
const titleFontColor = 'black'; // subgrid title color
const textBox = [40, 40]; // textbox width and height for sub grid axes labels
const mainTitle = "main title"; // main title
const myFont = "Arial";
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
  myFont: myFont,
  supSideBarWidth: supSideBarWidth,
};

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
      'C6B50;B50A1;B50IWP2 (10k)',
      'C6B50;B50A1;B50IWP2A1 (10k)',
      'C6B50;B50A1;B50IWP2A3 (10k)',
      'C6B50;B50A1;B50IWP2A10 (10k)',
      'C6B50;B50A1;B50IWP2A10 (10k) (rep2)',
      'C6B50;B50A1;B50IWP2A30 (10k)',
      'C6B50;B50A1;B50IWP2A100 (10k)',
    ],
    "C:/Users/zhiyu/OneDrive - Umich/dump/2025-09-01/exp26/10k/scatter",
    "TFAP2C_EOMES_",
    "_scatter_SOX17.png",
    "blockc_521",
    false,
    "dose",
    ["-", "A1", "A3", "A10", "A10", "A30", "A100"],
    "stain_round",
    ["1"],
    [50, 0, 0, 40],
    "Solid",
  ),
  new subGrid(
    7,
    1,
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
    true,
    "time",
    ["-", "A1", "A3", "A10", "A10", "A30", "A100"],
    "dose",
    ["-", "A1", "A3", "A10", "A10", "A30", "A100"],
    [80, 0, 0, 20],
    "Dashed",
  ),
];
// TODO: bug: adding y labels to the last column appends extra space
// Example:
// Valid positions: "rightTop", "rightBottom", "bottomLeft", "bottomRight".
gridList[0].setChildGrid(gridList[1], "bottomLeft", config);

// side bar labels
sideBarLabels = [
  { text: "DAPI", color: "coolGray" },
  { text: "TFAP2C", color: "red" },
  { text: "EOMES", color: "green" },
  { text: "SOX17", color: "blue" },
]

config["sideBarLabels"] = sideBarLabels;
// setup and draw grid
const rootGrid = 0;
const pageSize = getPageSize(gridList[rootGrid], config);
config["pageSize"] = pageSize;
doc = setup(app, config);
drawGrid(gridList[rootGrid], doc[0], doc[1], config);
