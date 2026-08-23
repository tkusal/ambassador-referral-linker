// @ts-check

import { createReferralUrl } from "./url-utils.js";

const extensionPrefix = "-msa"; // msa stands for Microsoft Student Ambassador
const parentIdPagePostfix = extensionPrefix + "-page";
const parentIdLinkPostfix = extensionPrefix + "-link";
const regexIdPostfix = new RegExp(parentIdPagePostfix + "$|" + parentIdLinkPostfix + "$", "i");

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
  "*://*.microsoft.com/*",
  "*://powerbi.microsoft.com/*",
  "*://reactor.microsoft.com/*",
  "*://studentambassadors.microsoft.com/*",
  "*://techcommunity.microsoft.com/*",
];

chrome.contextMenus.onClicked.addListener(async function (itemData) {
  const linkUrl = itemData.linkUrl !== undefined ? itemData.linkUrl : itemData.pageUrl;

  const contributorId = itemData.menuItemId.replace(regexIdPostfix, "");

  // Load language settings dynamically from storage to prevent SW suspension bugs
  const { makeNeutralURL = false } = await chrome.storage.sync.get("makeNeutralURL");

  const referralUrl = createReferralUrl(linkUrl, contributorId, makeNeutralURL);
  console.debug("[Ambassador Linker] Generated URL:", referralUrl);

  await setClipboardUsingOffscreenDocument(referralUrl);
});

async function setClipboardUsingOffscreenDocument(text) {
  // Create offscreen document if it doesn't exist
  try {
    await chrome.offscreen.createDocument({
      url: "offscreen.html",
      reasons: [chrome.offscreen.Reason.CLIPBOARD],
      justification: "Write text to the clipboard.",
    });
  } catch (e) {
    // If the offscreen document already exists, an error will be thrown. This is expected.
  }

  // Send message to offscreen document and close it after copy
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
        // Ignore errors when closing
        console.error("[Ambassador Linker] Error closing offscreen document:", e);
      }
    }
  );
}

function createContextMenus(contributorId) {
  chrome.contextMenus.removeAll();
  if (!contributorId) {
    return;
  }

  const linkParentId = contributorId + parentIdLinkPostfix;
  const pageParentId = contributorId + parentIdPagePostfix;

  chrome.contextMenus.create({
    title: chrome.i18n.getMessage("ctxCopyLink"),
    id: linkParentId,
    targetUrlPatterns: suitableSites,
    contexts: ["link"],
  });

  chrome.contextMenus.create({
    title: chrome.i18n.getMessage("ctxCopyPage"),
    id: pageParentId,
    documentUrlPatterns: suitableSites,
    contexts: ["page"],
  });
}

function updateContextMenus() {
  chrome.storage.sync.get(
    {
      contributorId: "",
      ambassadorId: "", // Fallback for old version
    },
    function (items) {
      const activeId = items.contributorId || items.ambassadorId || "";
      if (activeId) {
        console.debug("[Ambassador Linker] Updating context menus for ID:", activeId);
        createContextMenus(activeId);
      } else {
        console.debug("[Ambassador Linker] No ID found, removing context menus");
        chrome.contextMenus.removeAll();
      }
    }
  );
}

// Lifecycle listeners
chrome.runtime.onInstalled.addListener(async () => {
  // Run storage migration on install or upgrade
  const items = await chrome.storage.sync.get(["ambassadorId", "contributorId"]);
  if (items.ambassadorId && !items.contributorId) {
    await chrome.storage.sync.set({ contributorId: items.ambassadorId });
  }
  updateContextMenus();
});

chrome.runtime.onStartup.addListener(() => {
  updateContextMenus();
});

// React to option modifications automatically without sendMessage race conditions
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (
    areaName === "sync" &&
    (changes.contributorId || changes.ambassadorId || changes.makeNeutralURL)
  ) {
    updateContextMenus();
  }
});
