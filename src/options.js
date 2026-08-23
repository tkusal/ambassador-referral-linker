// @ts-check

const namefield = /** @type {HTMLInputElement} */ (document.querySelector("#name"));
const error = /** @type {HTMLElement} */ (document.querySelector("#error"));
const btnSave = /** @type {HTMLButtonElement} */ (document.querySelector("#btnSave"));
const chkLangNeutral = /** @type {HTMLInputElement} */ (document.querySelector("#chkLangNeutral"));
const savedIdDisplay = /** @type {HTMLElement} */ (document.querySelector("#savedIdDisplay"));

btnSave.onclick = (e) => {
  e.preventDefault();

  const contributorId = trimContributorId(namefield.value);

  if (!contributorId) {
    error.textContent = chrome.i18n.getMessage("msgErrorEmptyId");
    setTimeout(function () {
      error.textContent = "";
    }, 2000);
    return;
  }

  const idRegex = /^[a-zA-Z0-9_-]+$/;
  if (!idRegex.test(contributorId)) {
    error.textContent = chrome.i18n.getMessage("msgErrorInvalidId");
    setTimeout(function () {
      error.textContent = "";
    }, 3000);
    return;
  }

  saveOptions(contributorId, chkLangNeutral.checked);

  savedIdDisplay.textContent = chrome.i18n.getMessage("msgSavedIdPrefix") + contributorId;

  const status = /** @type {HTMLElement} */ (document.getElementById("status"));
  if (status) {
    status.textContent = chrome.i18n.getMessage("msgOptionsSaved");
    setTimeout(function () {
      status.textContent = "";
    }, 750);
  }
};

function trimContributorId(id) {
  return id.replace(/[\?&][wW][tT]\.[mM][cC]_[iI][dD]=/, "").trim();
}

function saveOptions(contributorId, makeNeutralURL) {
  // Save both configurations concurrently to prevent race conditions
  chrome.storage.sync.set({
    contributorId: contributorId,
    makeNeutralURL: makeNeutralURL,
  });
}

function restoreOptions() {
  chrome.storage.sync.get(
    {
      contributorId: "",
      ambassadorId: "", // Fallback
      makeNeutralURL: false,
    },
    function (items) {
      const savedId = items.contributorId || items.ambassadorId || "";
      namefield.value = savedId;
      if (savedId) {
        savedIdDisplay.textContent = chrome.i18n.getMessage("msgSavedIdPrefix") + savedId;
      }
      chkLangNeutral.checked = items.makeNeutralURL;
    }
  );
}

function localizeUI() {
  document.documentElement.lang = chrome.i18n.getUILanguage();
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const msgKey = el.getAttribute("data-i18n");
    if (msgKey) {
      el.textContent = chrome.i18n.getMessage(msgKey);
    }
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const inputEl = /** @type {HTMLInputElement} */ (el);
    const msgKey = inputEl.getAttribute("data-i18n-placeholder");
    if (msgKey) {
      inputEl.placeholder = chrome.i18n.getMessage(msgKey);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  localizeUI();
  restoreOptions();
});
