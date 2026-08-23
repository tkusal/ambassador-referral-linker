// @ts-check

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // ensure the message is related to this extension
  if (request.target !== "offscreen" || request.type !== "copy-to-clipboard") {
    return;
  }
  copyToClipboard(request.data);
  sendResponse({ success: true });
});

// As of January 2023, the navigator.clipboard API necessitates the element to be focused, but offscreen documents cannot be focused.
// Therefore, we must resort to using document.execCommand()
function copyToClipboard(text) {
  const copyFrom = document.createElement("textarea");
  copyFrom.textContent = text;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand("copy");
  copyFrom.blur();
  document.body.removeChild(copyFrom);
}
