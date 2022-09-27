let t = 0;
chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

setInterval(() => {
  chrome.alarms.create({
    periodInMinutes: 1 / 60,
  });
}, 300000);

chrome.storage.sync.get(["skipTime"], (res) => {
  let count = res.skipTime ?? 1;
  chrome.action.setBadgeText({
    text: `${count}`,
  });
});

script = () => {
  if (chrome.runtime.lastError === undefined) {
    console.clear();
    const skipBtnArray = document.getElementsByClassName(
      "ytp-ad-skip-button ytp-button"
    );
    if (skipBtnArray.length > 0) {
      let SkipBtn = skipBtnArray[0];
      SkipBtn.click();
      chrome.storage.sync.get(["skipTime"], (res) => {
        let time = res.skipTime ?? 1;
        time += 1;
        chrome.storage.sync.set({
          skipTime: time,
        });
        chrome.action.setBadgeText({
          text: `${time}`,
        });
      });
    }
  }
};

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.alarms.onAlarm.addListener(async () => {
  let tab;

  if (chrome && chrome.tabs) {
    tab = await getCurrentTab();
  }

  if (tab) {
    t += 1;
    if (chrome.scripting) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id, allFrames: true },
          func: script,
        },
        (_) => {
          let e = chrome.runtime.lastError;
        }
      );
    }
  }
});

