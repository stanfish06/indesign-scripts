#include "../classes/grids.jsx";
#include "../methods/setup.jsx";

// Configuration constants
const supTitleBarHeight = 0;
const supSideBarWidth = 0;
const titleBarHeight = 80;
const subGridWidth = 425;
const subGridHeight = 300;
const gridAxesLabelFontSize = 20;
const margin = 10;
const gap = 10;
const subGridFrameWidth = 5;
const subGridOffset = 5;
const cropTop = 0;
const cropBottom = 0;
const cropLeft = 0;
const cropRight = 0;
const textGap = 80;
const sideBarFontSize = 40;
const titleFontSize = 32;
const titleFontColor = 'black';
const textBox = [50, 40];
const mainTitle = "Well Indicator Example";
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
  myFont: myFont,
  supSideBarWidth: supSideBarWidth
};

/**
 * Well Indicator Configuration:
 *
 * {
 *   enabled: true,              // Enable/disable well indicators
 *   plateRows: 3,               // Number of rows in the well plate (e.g., 3 for a 3x6 plate)
 *   plateCols: 6,               // Number of columns in the well plate
 *   wellPositions: [            // Array of [row, col] positions (0-indexed) for each condition
 *     [0, 0], [0, 1], [0, 2],   // First row: A1, A2, A3
 *     [1, 0], [1, 1], [1, 2],   // Second row: B1, B2, B3
 *     [2, 0], [2, 1], [2, 2]    // Third row: C1, C2, C3
 *   ],
 *   position: "bottomRight",    // Position: "topLeft", "topRight", "bottomLeft", "bottomRight"
 *   offset: [10, 10],           // [x, y] offset from corner in points
 *   size: 40,                   // Total size of the indicator grid in points
 *   strokeWeight: 0.75,         // Line thickness for the grid
 *   bgOpacity: 85,              // Background opacity (0-100)
 *   checkColor: "red"           // Color for the check mark
 * }
 */

// Example: 3x3 grid with well indicators for a 3x6 plate
const gridList = [
  new subGrid(
    3,
    3,
    "Example with Well Indicators (3x6 plate)",
    ["DAPI", "GFP"],
    ["blue", "green"],
    [
      'condition_A1',
      'condition_A2',
      'condition_A3',
      'condition_B1',
      'condition_B2',
      'condition_B3',
      'condition_C1',
      'condition_C2',
      'condition_C3'
    ],
    "C:/Path/To/Your/Images",  // UPDATE THIS PATH
    "",
    "_merged.png",
    "matlabBlue",
    true,  // Fill by row
    "",    // No x-axis labels
    [],
    "",    // No y-axis labels
    [],
    [0, 0, 0, 30],
    "Solid",
    // Well indicator configuration
    {
      enabled: true,
      plateRows: 3,
      plateCols: 6,
      wellPositions: [
        [0, 0],  // condition_A1 -> Row 0 (A), Col 0 (1)
        [],  // condition_A2 -> Row 0 (A), Col 1 (2)
        [0, 2],  // condition_A3 -> Row 0 (A), Col 2 (3)
        [1, 0],  // condition_B1 -> Row 1 (B), Col 0 (1)
        [1, 1],  // condition_B2 -> Row 1 (B), Col 1 (2)
        [1, 2],  // condition_B3 -> Row 1 (B), Col 2 (3)
        [2, 0],  // condition_C1 -> Row 2 (C), Col 0 (1)
        [2, 1],  // condition_C2 -> Row 2 (C), Col 1 (2)
        [2, 2]   // condition_C3 -> Row 2 (C), Col 2 (3)
      ],
      position: "bottomRight",
      offset: [10, 10],
      size: 40,
      strokeWeight: 0.75,
      bgOpacity: 85,
      checkColor: "red"
    }
  )
];

// Setup and draw grid
const rootGrid = 0;
const pageSize = getPageSize(gridList[rootGrid], config);
config["pageSize"] = pageSize;
doc = setup(app, config);
drawGrid(gridList[rootGrid], doc[0], doc[1], config);

// Show error report if any images failed to load
showErrorReport();
