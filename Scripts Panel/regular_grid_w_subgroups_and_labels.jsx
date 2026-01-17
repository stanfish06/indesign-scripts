#include "./classes/grids.jsx";
#include "./methods/setup.jsx";

const supTitleBarHeight = 0; // main title bar height
const supSideBarWidth = 0; // main title bar width
const supSideBarPosOffset = [-105, 320];
const supSideBarSizeAdj = [8, 4];
const titleBarHeight = 80; // subgrid title bar height
const subGridWidth = 425; // figure width
const subGridHeight = 300; // figure height
const gridAxesLabelFontSize = 20; // subgrid axis label font size
const margin = 10; // top, bottom, right, and left margin
const gap = 10; // gap between figures
const subGridFrameWidth = 5; // subgrid frame line width
const subGridOffset = 5; // subgrid margin
const cropTop = 0; // Top crop figure
const cropBottom = 0; // Bottom crop figure
const cropLeft = 0; // Left crop figure
const cropRight = 0; // Right crop figure
const textGap = 80; // text grap in side bar
const sideBarFontSize = 40; // side bar text font size
const titleFontSize = 32; // subgrid title font size
const titleFontColor = 'black'; // subgrid title color
const textBox = [50, 40]; // textbox width and height for sub grid axes labels
const mainTitle = "olympus preview"; // main title
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
  supSideBarPosOffset: supSideBarPosOffset,
  supSideBarSizeAdj: supSideBarSizeAdj
};

/**
 * Typical Usage:
 *   1. Define one or more grids inside an array:
 *        const gridList = [
 *          new subGrid(
 *            nrow, ncol,                 // number of rows, columns
 *            title,                      // grid title (optional)
 *            channelNames, channelColors,// side bar labels + colors
 *            conditionList,             // array of image/condition names
 *            folderPath, prefix, postfix, // image folder + file naming
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
    3,
    3,
    "2.5d PGC MP, positive control for transdifferentiation",
    ["DAPI", "EOMES", "EOMES", "TFAP2C"],
    ["lightGray", "red", "green", "blue"],
    [
      'mstar DOX1 SB',
      'mstar Dox1',
      'mstar A50 DOX1',
      "",
      'mstar',
      'mstar A50',
      "",
      "",
      'mstar A50 MEKi',
    ],
    "C:/Users/zhiyu/OneDrive - Umich/dump/2026-01-16/plate2/mip_montage",
    "",
    "_merged.png",
    "matlabBlue",
    true,
    "dose",
    ["SB", "-", "A50"],
    "dose",
    ["DOX", "-", "MEKi"],
    [80, 0, 0, 30],
    "Solid",
  ),
];

// TODO: bug: adding y labels to the last column appends extra space
// Example:
// Valid positions: "rightTop", "rightBottom", "bottomLeft", "bottomRight".
gridList[0].setChildGrid(gridList[1], "bottomLeft", config);

// side bar labels
sideBarLabels = [
  { text: "cell line: PGP1", color: "black" },
  { text: "plate3: 100um-MP", color: "blockc_511" },
  { text: "plate3: Disordered", color: "matlabYellow" },
  { text: "plate3: FACS-D0", color: "blockc_531" },
  { text: "plate4: FACS-D1", color: "blockc_541" },
  { text: "plate5: FACS-D2", color: "blockc_521" },
]

config["sideBarLabels"] = sideBarLabels;
// setup and draw grid
const rootGrid = 0;
const pageSize = getPageSize(gridList[rootGrid], config);
config["pageSize"] = pageSize;
doc = setup(app, config);
drawGrid(gridList[rootGrid], doc[0], doc[1], config);

// Show error report if any images failed to load
showErrorReport();
