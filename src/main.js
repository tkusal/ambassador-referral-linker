const QUERY_KEY = "WT.mc_id";
const extensionPrefix = "-msa"; // msa stands for Microsoft Student Ambassador
const parentIdPagePostfix = extensionPrefix + "-page";
const parentIdLinkPostfix = extensionPrefix + "-link";
const regex = /\/en-us/i; //look for URLs that force English language
const regexIdPostfix = new RegExp(
  parentIdPagePostfix + "$|" + parentIdLinkPostfix + "$",
  "i"
);
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
  "*://microsoft.com/*",
  "*://powerbi.microsoft.com/*",
  "*://reactor.microsoft.com/*",
  "*://studentambassadors.microsoft.com/*",
  "*://techcommunity.microsoft.com/*"
];
const regexAll = /(?<=\.com)\/[a-zA-Z]{2}(-[a-zA-Z]{4}){0,1}-[a-zA-Z]{2}/i; //look for URLs that force any language - assumes the format is xxxxxxx.com/xx-yy or xxxxxxx.com/xx-zzzz-yy
var makeNeutralURL = false; // toggle for removal of language code from English URLs
var makeNeutralURLAll = false; // toggle for removal of language code from language specific URLs in any language

chrome.contextMenus.onClicked.addListener(async function (itemData) {
  var linkUrl =
    itemData.linkUrl !== undefined ? itemData.linkUrl : itemData.pageUrl;
  var url = new URL(linkUrl);

  // remove the postfix to get the actual ambassador Id
  var ambassadorId = itemData.menuItemId.replace(regexIdPostfix, "");

  url.searchParams.set(QUERY_KEY, ambassadorId);
  if (makeNeutralURL) {
    url.href = url.href.replace(regex, "");
  } //remove language code from URL
  if (makeNeutralURLAll) {
    url.href = url.href.replace(regexAll, "");
  } //remove language code from URL

  await setClipboardUsingOffscreenDocument(url.href);
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

  // Send message to offscreen document
  chrome.runtime.sendMessage({
    type: "copy-to-clipboard",
    target: "offscreen",
    data: text,
  });
}

function createContextMenues(ambassadorIds) {
  chrome.contextMenus.removeAll();
  if (ambassadorIds.length < 1) {
    return;
  }

  let linkParentId =
    ambassadorIds.length > 1
      ? "root" + parentIdLinkPostfix
      : ambassadorIds[0] + parentIdLinkPostfix;

  let pageParentId =
    ambassadorIds.length > 1
      ? "root" + parentIdPagePostfix
      : ambassadorIds[0] + parentIdPagePostfix;

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

  if (ambassadorIds.length > 1) {
    ambassadorIds.forEach(function (ambassadorId) {
      chrome.contextMenus.create({
        title: ambassadorId,
        id: ambassadorId + parentIdLinkPostfix,
        parentId: linkParentId,
        contexts: ["link"],
      });
      chrome.contextMenus.create({
        title: ambassadorId,
        id: ambassadorId + parentIdPagePostfix,
        parentId: pageParentId,
        contexts: ["page"],
      });
    });
  }
}

function updateContextMenues() {
  chrome.storage.sync.get(
    {
      list: [],
    },
    function (items) {
      if (items) {
        createContextMenues(items.list);
      } else {
        chrome.contextMenus.removeAll();
      }
    }
  );
}

// Load  Language options from  chrome.storage
function restoreLangOptions() {
  // Use default value makeNeutralURL = false.
  chrome.storage.sync.get(
    {
      makeNeutralURL: false,
      makeNeutralURLAll: false,
    },
    function (items) {
      makeNeutralURL = items.makeNeutralURL;
      makeNeutralURLAll = items.makeNeutralURLAll;
    }
  );
}

chrome.runtime.onMessage.addListener(function (request) {
  if (request === "updateMSAContextMenues") {
    updateContextMenues();
    restoreLangOptions();
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    updateContextMenues();
    restoreLangOptions();
  }
});
