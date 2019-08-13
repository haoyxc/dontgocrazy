var firstHref = window.location.toString();

console.log(firstHref);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "clicked_browser_action") {
    var firstHref = window.location.toString();

    console.log(firstHref);
  }
});
