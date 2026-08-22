const btnAdd = document.querySelector("#btnAdd");
const btnRemove = document.querySelector("#btnRemove");
const sb = document.querySelector("#list");
const namefield = document.querySelector("#name");
const error = document.querySelector("#error");
const chkLanguageneutral = document.querySelector("#chkLanguageneutral");
const chkLanguageneutralAll = document.querySelector("#chkLanguageneutralAll");

btnAdd.onclick = (e) => {
  e.preventDefault();

  let ambassadorId = trimAmbassadorId(namefield.value);
  let values = Object.keys(sb.options).map((f) => sb.options[f].value);

  // ensure there are no duplicates
  if (values.includes(ambassadorId)) {
    error.textContent = chrome.i18n.getMessage("msgIdExists");

    setTimeout(function () {
      error.textContent = "";
    }, 2000);

    namefield.focus();
    return;
  }

  const option = new Option(ambassadorId, ambassadorId);
  sb.add(option, undefined);

  saveAmbassadorIds();

  // reset the value of the input
  namefield.value = "";
  namefield.focus();
};

function trimAmbassadorId(ambassadorId) {
  return ambassadorId.replace("?WT.mc_id=", "").trim();
}

function saveAmbassadorIds() {
  let ambassadorIds = Object.keys(sb.options).map((f) => sb.options[f].value);

  chrome.storage.sync.set(
    {
      list: ambassadorIds,
    },
    function () {}
  );

  chrome.runtime.sendMessage("updateMSAContextMenues");
}

btnRemove.onclick = (e) => {
  e.preventDefault();

  // save the selected option
  let selected = [];

  for (let i = 0; i < sb.options.length; i++) {
    selected[i] = sb.options[i].selected;
  }

  // remove all selected option
  let index = sb.options.length;
  while (index--) {
    if (selected[index]) {
      sb.remove(index);
    }
  }

  saveAmbassadorIds();
};

chkLanguageneutral.onchange = (e) => {
  e.preventDefault();
  saveLangOptions();
};

chkLanguageneutralAll.onchange = (e) => {
  e.preventDefault();
  saveLangOptions();
};

// Saves Language options to chrome.storage
function saveLangOptions() {
  var makeNeutralURL = document.getElementById("chkLanguageneutral").checked;
  var makeNeutralURLAll = document.getElementById(
    "chkLanguageneutralAll"
  ).checked;
  chrome.storage.sync.set(
    {
      makeNeutralURL: makeNeutralURL,
      makeNeutralURLAll: makeNeutralURLAll,
    },
    function () {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.textContent = chrome.i18n.getMessage("msgOptionsSaved");
      setTimeout(function () {
        status.textContent = "";
      }, 750);
    }
  );
}

// Load  Language options from  chrome.storage
function restoreLangOptions() {
  // Use default value makeNeutralURL = false to preserve legacy bahavior of the extension
  chrome.storage.sync.get(
    {
      makeNeutralURL: false,
      makeNeutralURLAll: false,
    },
    function (items) {
      document.getElementById("chkLanguageneutral").checked =
        items.makeNeutralURL;
      document.getElementById("chkLanguageneutralAll").checked =
        items.makeNeutralURLAll;
    }
  );
}

function restoreOptions() {
  restoreLangOptions();
  chrome.storage.sync.get(
    {
      list: [],
    },
    function (items) {
      if (items) {
        items.list.forEach(function (item) {
          const option = new Option(item, item);
          sb.add(option, undefined);
        });
      }
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
