// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.message === "clicked_browser_action") {
//     const getUrl = window.location.origin;
//     const id = request.userId;
//     console.log(getUrl);
//     console.log(id);
//     console.log("STATUS", request.status);
//   }
// });

chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
  if (request.message === "testing") {
    console.log("hello");
    console.log(request.status, request.key);
  }
});