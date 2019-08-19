// Receives messages from background and interacts with webpage
let activeUrl = null;
let prevUrl = null;
let currInterval;
let userId;
let ticker = 0;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // TAB CHANGE ACTION (after data is sent)
  if (request.message === "changeTab") {
    // Start timer
    currInterval = setInterval(() => {
      ticker++;
    }, 1000);
  }

  // URL CHANGE ACTION (after data is sent)
  if (request.message === "changeUrl") {
    // Start timer
    currInterval = setInterval(() => {
      ticker++;
    }, 1000);
    // Updates url and references past url for sending data
    prevUrl = activeUrl;
    activeUrl = window.location.origin.toString();
  }

  // DATA SENDING (happens first when changing url and tabs)
  if (request.message === "sendData") {
    // Stop timer on the tab indicated by message
    clearInterval(currInterval);
    // Set user and url to send data for
    userId = request.userId;

    // Send data
    if (activeUrl.length) {
      console.log(
        `Data to save: user: ${userId} time: ${ticker} url: ${activeUrl}`
      );
      $.post("https://tranquil-wildwood-15780.herokuapp.com/updateStats", {
        userId: userId,
        time: ticker,
        url: activeUrl
      })
        .done(function(res) {
          console.log("success");
        })
        .fail(function(res) {
          console.log("fail");
        });
    }

    // reset ticker
    ticker = 0;
  }
});


