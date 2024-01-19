chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo?.status !== "complete") return;
  if (tab.url.startsWith("chrome://")) return;

  chrome.scripting
    .executeScript({
      target: { tabId: tabId, allFrames: true },
      world: "MAIN",
      function: () => {
        console.log("VNC fix: starting job (finding canvas)");
        function clearIntervals() {
          console.log("VNC fix: stopping job");
          const interval_id = window.setInterval(function () {}, Number.MAX_SAFE_INTEGER);
          for (let i = 1; i < interval_id; i++) {
            window.clearInterval(i);
          }
        }
        clearIntervals();

        let rootEl;
        let errorPage;
        let vncDisconnected;
        let vncConnected;
        let canvas;
        setInterval(() => {
          rootEl = document.querySelector("body > #root");
          errorPage = document.querySelector("#root > #error_page");
          vncDisconnected = document.querySelector("#root > #vnc_disconnected");
          vncConnected = document.querySelector("#root > #vnc_connected");
          canvas = document.querySelector("#vnc_connected > div > div > canvas");

          if (!rootEl || errorPage || (!vncDisconnected && !vncConnected)) {
            console.log("VNC fix: not a VNC page or error occurred");
            return clearIntervals();
          }
          if (!canvas) return console.log("VNC fix: waiting for canvas render");
          console.log("VNC fix: canvas found, fixing cursor");
          canvas.style.cursor = "default";
          clearIntervals();
        }, 100);
      },
    })
    .catch((e) => {
      console.log("VNC fix: error occurred: ", e);
    });
});
