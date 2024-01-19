const storage = chrome.storage.local;
const txtBox = document.getElementById('url');

// load from storage
storage.get('url', function (items) {
  if (items.url) {
    txtBox.value = items.url;
  }
});

// save to storage on change
txtBox.addEventListener('change', async function saveChanges() {
  const url = txtBox.value;
  if (!url) return;
  await storage.set({ url: url });
});
