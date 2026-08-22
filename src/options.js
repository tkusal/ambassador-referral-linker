const namefield = document.querySelector("#name");
const error = document.querySelector("#error");
const btnSave = document.querySelector("#btnSave");
const chkLangNeutral = document.querySelector("#chkLangNeutral");
const savedIdDisplay = document.querySelector("#savedIdDisplay");

btnSave.onclick = (e) => {
  e.preventDefault();

  const contributorId = trimContributorId(namefield.value);

  if (!contributorId) {
    error.textContent = "ID não pode ser vazio / ID cannot be empty.";
    setTimeout(function () {
      error.textContent = "";
    }, 2000);
    return;
  }

  const idRegex = /^[a-zA-Z0-9_-]+$/;
  if (!idRegex.test(contributorId)) {
    error.textContent = "ID inválido (apenas letras, números, _ e -) / Invalid ID (letters, numbers, _ and - only).";
    setTimeout(function () {
      error.textContent = "";
    }, 3000);
    return;
  }

  saveOptions(contributorId, chkLangNeutral.checked);

  savedIdDisplay.textContent = "ID Salvo / Saved ID: " + contributorId;

  const status = document.getElementById("status");
  status.textContent = chrome.i18n.getMessage("msgOptionsSaved");
  setTimeout(function () {
    status.textContent = "";
  }, 750);
};

function trimContributorId(id) {
  return id.replace(/[\?&][wW][tT]\.[mM][cC]_[iI][dD]=/, "").trim();
}

function saveOptions(contributorId, makeNeutralURL) {
  // Save both configurations concurrently to prevent race conditions
  chrome.storage.sync.set({
    contributorId: contributorId,
    makeNeutralURL: makeNeutralURL
  });
}

function restoreOptions() {
  chrome.storage.sync.get(
    {
      contributorId: "",
      ambassadorId: "", // Fallback
      makeNeutralURL: false
    },
    function (items) {
      const savedId = items.contributorId || items.ambassadorId || "";
      namefield.value = savedId;
      if (savedId) {
        savedIdDisplay.textContent = "ID Salvo / Saved ID: " + savedId;
      }
      chkLangNeutral.checked = items.makeNeutralURL;
    }
  );
}

function localizeUI() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = chrome.i18n.getMessage(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = chrome.i18n.getMessage(el.getAttribute('data-i18n-placeholder'));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  localizeUI();
  restoreOptions();
});
