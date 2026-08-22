
const extensionPrefix = "-msa"; // msa stands for Microsoft Student Ambassador
const parentIdPagePostfix = extensionPrefix + "-page";
const parentIdLinkPostfix = extensionPrefix + "-link";
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

var makeNeutralURL = false; // toggle for removal of language code from URLs

chrome.contextMenus.onClicked.addListener(async function (itemData) {
  var linkUrl =
    itemData.linkUrl !== undefined ? itemData.linkUrl : itemData.pageUrl;
  var url = new URL(linkUrl);

  // check if this specific ambassador ID is already appended to prevent duplicates
  var ambassadorId = itemData.menuItemId.replace(regexIdPostfix, "");
  let existingParams = url.searchParams.getAll("wt.mc_id");
  let alreadyExists = existingParams.some(p => p.toLowerCase() === ambassadorId.toLowerCase());
  
  if (!alreadyExists) {
    url.searchParams.append("wt.mc_id", ambassadorId);
  }
  
  if (makeNeutralURL) {
    // Matches /en-us, /pt-br, /es-es, etc at the start of the path
    url.pathname = url.pathname.replace(/^\/[a-zA-Z]{2}-[a-zA-Z]{2}(-[a-zA-Z]{2})?(?=\/|$)/i, "");
    if (!url.pathname.startsWith('/')) {
        url.pathname = '/' + url.pathname;
    }
  }

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

function createContextMenues(ambassadorId) {
  chrome.contextMenus.removeAll();
  if (!ambassadorId) {
    return;
  }

  let linkParentId = ambassadorId + parentIdLinkPostfix;
  let pageParentId = ambassadorId + parentIdPagePostfix;

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

function updateContextMenues() {
  chrome.storage.sync.get(
    {
      ambassadorId: "",
    },
    function (items) {
      if (items && items.ambassadorId) {
        createContextMenues(items.ambassadorId);
      } else {
        chrome.contextMenus.removeAll();
      }
    }
  );
}

// Load Language options from chrome.storage
function restoreLangOptions() {
  chrome.storage.sync.get(
    {
      makeNeutralURL: false
    },
    function (items) {
      makeNeutralURL = items.makeNeutralURL;
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
