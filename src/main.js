// @ts-check

import { createReferralUrl } from "./url-utils.js";

const suitableSites = [
  "*://azure.microsoft.com/*",
  "*://blog.fabric.microsoft.com/*",
  "*://code.visualstudio.com/*",
  "*://community.fabric.microsoft.com/*",
  "*://community.powerplatform.com/*",
  "*://copilot.microsoft.com/*",
  "*://devblogs.microsoft.com/*",
  "*://developer.microsoft.com/*",
  "*://dotnet.microsoft.com/*",
  "*://events.microsoft.com/*",
  "*://imaginecup.microsoft.com/*",
  "*://learn.microsoft.com/*",
  "*://mvp.microsoft.com/*",
  "*://powerbi.microsoft.com/blog*",
  "*://reactor.microsoft.com/*",
  "*://techcommunity.microsoft.com/*",
  "*://*.microsoft.com/insidetrack*",
  "*://*.microsoft.com/microsoft-365-copilot*",
  "*://*.microsoft.com/microsoft-cloud/blog*",
  "*://*.microsoft.com/microsoft-copilot/for-individuals*",
  "*://*.microsoft.com/microsoft-fabric*",
  "*://*.microsoft.com/power-platform*",
  "*://*.microsoft.com/startups*",
];

chrome.contextMenus.onClicked.addListener(async function (itemData) {
  const linkUrl = itemData.linkUrl !== undefined ? itemData.linkUrl : itemData.pageUrl || "";

  const items = await chrome.storage.sync.get(["contributorId", "makeNeutralURL"]);
  const contributorId = items.contributorId ? String(items.contributorId) : "";
  const makeNeutralURL = Boolean(items.makeNeutralURL);

  if (!contributorId) {
    return;
  }

  const referralUrl = createReferralUrl(linkUrl, contributorId, makeNeutralURL);

  await setClipboardUsingOffscreenDocument(referralUrl);
});

let creating; // Global promise for offscreen document creation
async function setupOffscreenDocument() {
  if (await chrome.offscreen.hasDocument()) return;
  if (creating) {
    await creating;
    return;
  }
  creating = chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: [chrome.offscreen.Reason.CLIPBOARD],
    justification: "Write text to the clipboard.",
  });
  await creating;
  creating = null;
}

async function setClipboardUsingOffscreenDocument(text) {
  if (chrome.offscreen) {
    try {
      await setupOffscreenDocument();
      chrome.runtime.sendMessage(
        {
          type: "copy-to-clipboard",
          target: "offscreen",
          data: text,
        },
        async () => {
          try {
            await chrome.offscreen.closeDocument();
          } catch (e) {
            console.error("[Ambassador Linker] Error closing offscreen document:", e);
          }
        }
      );
    } catch (e) {
      console.error("[Ambassador Linker] Error with offscreen document:", e);
    }
  } else {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.error("[Ambassador Linker] Error copying to clipboard via navigator.clipboard:", e);
    }
  }
}

async function createContextMenus() {
  await chrome.contextMenus.removeAll();

  chrome.contextMenus.create({
    title: chrome.i18n.getMessage("ctxCopyLink"),
    id: "copy-link",
    targetUrlPatterns: suitableSites,
    contexts: ["link"],
  });

  chrome.contextMenus.create({
    title: chrome.i18n.getMessage("ctxCopyPage"),
    id: "copy-page",
    documentUrlPatterns: suitableSites,
    contexts: ["page"],
  });
}

chrome.runtime.onInstalled.addListener(async () => {
  const items = await chrome.storage.sync.get(["ambassadorId", "contributorId"]);
  if (items.ambassadorId) {
    if (!items.contributorId) {
      await chrome.storage.sync.set({ contributorId: items.ambassadorId });
    }
    await chrome.storage.sync.remove("ambassadorId");
  }
  createContextMenus();
});

chrome.runtime.onStartup.addListener(() => {
  createContextMenus();
});
