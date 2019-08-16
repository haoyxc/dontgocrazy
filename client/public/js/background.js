//urls for testing
const urls = ["*://*.facebook.com/", "*://*.youtube.com/", "*://*.instagram.com/"];
chrome.tabs.sendMessage(activeTab.id, {
  message: "testing",
  status: "success",
  key: "HOLA"
});
let active = {};
const STORAGE = chrome.storage.local;

const update = async (host, seconds) => {
  const currentDate = new Date().toISOString().substr(0, 10);
  const data = await getDate(currentDate);
};

const end = () => {
  if (active.name) {
    const timeDiff = parseInt((Date.now() - active.time) / 1000);
    console.log(`${timeDiff} seconds on ${active.name}`);
    active = {};
  }
};

const getActiveTab = () => {
  return new Promise(resolve => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true
      },
      activeTab => {
        resolve(activeTab[0]);
      }
    );
  });
};

const setActive = async () => {
  const activeTab = await getActiveTab();
  if (activeTab) {
    const { url } = activeTab;

    //check if tab's url is in the array of urls
    let host = new URL(url).hostname;
    host = host.replace("www.", "").replace(".com", "");
    if (urls.some(each => each.includes(host))) {
      if (active.name !== host) {
        //if diff site is active then end existing site's session
        end();
        active = {
          name: host,
          time: Date.now()
        };
        console.log(`${active.name} visited at ${active.time}`);
      }
    }
  }
};
chrome.tabs.onUpdated.addListener((tabId, changeDetails, tab) => {
  console.log("TAB", tab);
  setActive();
});

chrome.tabs.onActivated.addListener(() => {
  if (active.name) {
    end();
  }
  setActive();
});

chrome.windows.onFocusChanged.addListener(window => {
  if (window === -1) {
    end();
  } else {
    setActive();
  }
});

// Called when the user clicks on the browser action.
// chrome.browserAction.onClicked.addListener(function(tab) {
//   // Send a message to the active tab
//   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     var activeTab = tabs[0];
//     chrome.identity.getProfileUserInfo(function(userInfo) {
//       chrome.tabs.sendMessage(activeTab.id, {message: "clicked_browser_action", status: "first", userId: userInfo.id})
//       $.post("https://www.gocrazy/createUser", {
//         name: "Brian",
//         userId: userInfo.id.toString()
//       })
//       .done(function() {
//         chrome.tabs.sendMessage(activeTab.id, { message: "clicked_browser_action", status: "success", userId: userInfo.id });
//       })
//       .fail(function() {
//         chrome.tabs.sendMessage(activeTab.id, { message: "clicked_browser_action", status: "failure", userId: userInfo.id });
//       })
//     })
//   });
// });
