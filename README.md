# cloudflared-vnc-fix

Annoyed of invisible cursor in Cloudflared's browser VNC sessions? Try this easy fix.

### Chrome Extension Store

I uploaded this to Chrome Extension Store so anyone can use it. [Link](https://chromewebstore.google.com/detail/cloudflared-vnc-cursor-fi/hfiidnamhjfaenaafpkcehaplnjigecf)

## Changelog

### v0.0.3

Automatic detection of browser VNC session. Chrome.storage is no more needed. Removed the popup needed for setting the URL.

### v0.0.2

Using webRequest ended up working horribly, had to switch to tabs.onUpdate
