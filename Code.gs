/**
 * Handles HTTP GET requests to the web app.
 * Returns the HTML content to be displayed.
 */
function doGet() {
  // Get the HTML file content
  const htmlOutput = HtmlService.createHtmlOutputFromFile('Index')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // Allows embedding in iframes if needed

  return htmlOutput;
}

/**
 * Fetches all data from the first sheet in the active spreadsheet.
 * This function is called by the client-side JavaScript using google.script.run.
 * @returns {Array<Array<any>>} A 2D array containing all the data from the sheet.
 */
function getSheetData() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]; // Get the first sheet
    const range = sheet.getDataRange(); // Get the range containing all data
    const values = range.getValues(); // Get the data as a 2D array
    console.log("values: ", values)
    return JSON.parse(JSON.stringify(values));
  } catch (e) {
    // Log the error and re-throw or return a specific error indication
    Logger.log("Error in getSheetData: " + e.toString());
    // In a real app, you might return an object like { error: e.toString() }
    // and handle that in the failure handler.
    // For now, we'll let the failure handler catch it.
    throw new Error("Could not fetch data: " + e.toString());
  }
}
