console.log("CONSOLE ready");

function renameJournal() {
    document.title = prompt("Name your journal:");
}

// what i want to happen:
// 1. on all keypresses, a random color will appear on the right side
// 2. detect certain words, which will trigger specific colors, sizes, or shapes
//    ie, typing "happy" will make a soft, yellow circle appear on the canvas. however, typing "sad" will make a sharp purple triangle appear on the canvas

$(document).ready(function() {
    console.log("JQUERY ready");

    function createLetter(key) {
        var cursor = document.querySelector("#cursor");
        var span = document.createElement("span");
        span.innerHTML = key;
        cursor.parentNode.insertBefore(span, cursor);
    }

    function deleteElement() {
        var letter = document.querySelector("#cursor").previousSibling;
        if (letter) {
          letter.remove();
        }
    }

    $(document).on("keydown", function(e) {
        if ("abcdefghijklmnopqrstuvwxyz!,'.;:?0123456789".includes(e.key.toLowerCase())) {
            createLetter(e.key);
        } else if (e.keyCode == 32){
            createLetter("&nbsp;");
        }
        else if (e.keyCode == 8) {
            deleteElement();
        }
    }); 

});

