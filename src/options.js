const namefield = document.querySelector("#name");
const error = document.querySelector("#error");
const btnSave = document.querySelector("#btnSave");
const chkLangNeutral = document.querySelector("#chkLangNeutral");
const savedIdDisplay = document.querySelector("#savedIdDisplay");

btnSave.onclick = (e) => {
  e.preventDefault();

  let ambassadorId = trimAmbassadorId(namefield.value);

  if (!ambassadorId) {
    error.textContent = "ID não pode ser vazio / ID cannot be empty.";
    setTimeout(function () {
      error.textContent = "";
    }, 2000);
    return;
  }

  saveAmbassadorId(ambassadorId);
  saveLangOptions();

  savedIdDisplay.textContent = "ID Salvo: " + ambassadorId;

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
      if (items.ambassadorId) {
        savedIdDisplay.textContent = "ID Salvo: " + items.ambassadorId;
      }
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
