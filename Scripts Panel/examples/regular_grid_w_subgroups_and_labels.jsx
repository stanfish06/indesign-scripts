#include "../classes/grids.jsx";
#include "../methods/setup.jsx";

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
    4,
    "grid1",
    [],
    [],
    [
      'fish',
      'fish',
      'fish',
      'fish',
      'fish',
      'fish',
      'fish',
      'fish',
    ],
    "C:/Users/zhiyu/AppData/Roaming/Adobe/InDesign/Version 20.0/en_US/Scripts/Scripts Panel/examples",
    "",
    ".png",
    "blockc_521",
    false,
    "dose",
    ["1", "2", "3", "4"],
    "stain_round",
    ["1"],
    [50, 0, 0, 40],
    "Solid",
  ),
  new subGrid(
    3,
    3,
    "grid2",
    [],
    [],
    [
      'fish',
      'fish',
      'fish',
      'fish',
      'fish',
      'fish',
      'fish',
      'fish',
      'fish',
    ],
    "C:/Users/zhiyu/AppData/Roaming/Adobe/InDesign/Version 20.0/en_US/Scripts/Scripts Panel/examples",
    "",
    ".png",
    "blockc_531",
    false,
    "dose",
    ["1", "2", "3"],
    "dose",
    ["1", "2", "3"],
    [50, 0, 0, 40],
    "Dashed",
  ),
  new subGrid(
    2,
    2,
    "grid2",
    [],
    [],
    [
      'fish',
      'fish',
      'fish',
      'fish',
    ],
    "C:/Users/zhiyu/AppData/Roaming/Adobe/InDesign/Version 20.0/en_US/Scripts/Scripts Panel/examples",
    "",
    ".png",
    "blockc_541",
    false,
    "time",
    ["1", "2"],
    "time",
    ["1", "2"],
    [60, 0, 0, 20],
    "Dotted",
  ),
];
// TODO: bug: adding y labels to the last column appends extra space
// Example:
// Valid positions: "rightTop", "rightBottom", "bottomLeft", "bottomRight".
gridList[0].setChildGrid(gridList[1], "bottomLeft", config);
gridList[1].setChildGrid(gridList[2], "rightBottom", config);

// side bar labels
sideBarLabels = [
  { text: "label1", color: "coolGray" },
  { text: "label2", color: "red" },
  { text: "label3", color: "green" },
  { text: "label4", color: "blue" },
]

config["sideBarLabels"] = sideBarLabels;
// setup and draw grid
const rootGrid = 0;
const pageSize = getPageSize(gridList[rootGrid], config);
config["pageSize"] = pageSize;
doc = setup(app, config);
drawGrid(gridList[rootGrid], doc[0], doc[1], config);
