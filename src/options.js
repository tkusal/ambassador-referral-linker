const namefield = document.querySelector("#name");
const error = document.querySelector("#error");
const btnSave = document.querySelector("#btnSave");
const chkLangNeutral = document.querySelector("#chkLangNeutral");

btnSave.onclick = (e) => {
  e.preventDefault();

  let ambassadorId = trimAmbassadorId(namefield.value);

  saveAmbassadorId(ambassadorId);
  saveLangOptions();

  var status = document.getElementById("status");
  status.textContent = chrome.i18n.getMessage("msgOptionsSaved");
  setTimeout(function () {
    status.textContent = "";
  }, 750);
};

function trimAmbassadorId(ambassadorId) {
  return ambassadorId.replace(/[\?&][wW][tT]\.[mM][cC]_[iI][dD]=/, "").trim();
}

function saveAmbassadorId(ambassadorId) {
  chrome.storage.sync.set(
    {
      ambassadorId: ambassadorId,
    },
    function () {}
  );

  chrome.runtime.sendMessage("updateMSAContextMenues");
}

function saveLangOptions() {
  var makeNeutralURL = document.getElementById("chkLangNeutral").checked;
  chrome.storage.sync.set({
      makeNeutralURL: makeNeutralURL
  });
}

function restoreOptions() {
  chrome.storage.sync.get(
    {
      ambassadorId: "",
      makeNeutralURL: false
    },
    function (items) {
      namefield.value = items.ambassadorId;
      document.getElementById("chkLangNeutral").checked = items.makeNeutralURL;
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
