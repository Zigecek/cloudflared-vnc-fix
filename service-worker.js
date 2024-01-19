chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log(tab);
  chrome.storage.local.get('url', function (items) {
    if (!items.url) return;
    if (tab.url.includes(items.url)) {
      console.log('VNC tab detected');
      chrome.scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        world: 'MAIN',
        injectImmediately: true,
        function: () => {
          function clearIntervals() {
            console.log('Clearing all previous intervals');
            const interval_id = window.setInterval(function () {},
            Number.MAX_SAFE_INTEGER);
            for (let i = 1; i < interval_id; i++) {
              window.clearInterval(i);
            }
          }
          clearIntervals();

          setTimeout(() => {
            setInterval(() => {
              let canvas = document.querySelector(
                '#vnc_connected > div > div > canvas'
              );
              if (!canvas) return;
              console.log('VNC canvas renderer cursor fixed');
              canvas.style.cursor = 'default';
              clearIntervals();
            }, 100);
          }, 1000);
        }
      });
    }
  });
});
