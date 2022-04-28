console.log("ready");

function renameJournal() {
    document.title = prompt("Name your journal:");
}

function typeLetter(key) {
    console.log("typeLetter ready");
    var span = document.createElement("span");
    span.innerHTML = key;
}