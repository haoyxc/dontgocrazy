// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var activeTab = tabs[0];
    chrome.identity.getProfileUserInfo(function(userInfo) {
      chrome.tabs.sendMessage(activeTab.id, {message: "clicked_browser_action", status: status, userId: userInfo.id})
      
      $.post("https://tranquil-wildwood-15780.herokuapp.com/createUser", {
        name: "Brian",
        userId: userInfo.id.toString()
      })
      .done(function() {
        chrome.tabs.sendMessage(activeTab.id, { message: "clicked_browser_action", status: "success", userId: userInfo.id });
      })
      .fail(function() {
        chrome.tabs.sendMessage(activeTab.id, { message: "clicked_browser_action", status: "failure", userId: userInfo.id });
      })
    })
  });
});