// This script closes all open documents without saving
if (app.documents.length > 0) {
  // Loop backwards through the documents array to safely close each document
  for (var i = app.documents.length - 1; i >= 0; i--) {
    app.documents[i].close(SaveOptions.NO);
  }
}
