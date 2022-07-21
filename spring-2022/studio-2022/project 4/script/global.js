console.log("CONSOLE ready");

$(document).ready(function() {
    console.log("JQUERY ready");

    // functions for instructions

    $("#instructions-button").click(function() {
        $("main").fadeOut(600);
        $("#instructions-container").fadeIn(500);
    })

    $("#close").click(function() {
        $("#instructions-container").fadeOut(500);
        $("main").fadeIn(600);
    })

    // functions for the typing stuff

    // types the letters
    function createLetter(key) {
        var cursor = document.querySelector("#cursor");
        var span = document.createElement("span");
        span.innerHTML = key;
        cursor.parentNode.insertBefore(span, cursor);
    }

    // deletes letters on backspace press
    // also deletes the last div in canvas container
    function deleteElement() {
        var letter = document.querySelector("#cursor").previousSibling;
        if (letter) {
          letter.remove();
        }
        var canvasContainer = document.querySelector("#canvas-container");
        canvasContainer.removeChild(canvasContainer.lastChild);
    }

    // delete the last div in canvas container after a certain period of time so the site won't slow down
    function deleteDivTimed() {
        setTimeout(function () {
            console.log("removing element");
            $("#canvas-container").children().first().remove();
        }, 6400);   
    }

    // allow for random HSL colors
    function getRandomColor() {
        return 'hsla(' + (Math.random() * 360) + ', 95%, 65%, 1)';
    }

    // allow for random sizes
    function getRandomSize() {
        let randomNum = Math.random();
        let min = 0;
        let max = 2;
        return 'scale(' + (randomNum * (max - min) + min) + ',' + (randomNum * (max - min) + min) + ')';
    }

    // put in random position 
    function getRandomPos(div) {
        div.style.left= (100 * Math.random()) + '%';
        div.style.top= (100 * Math.random()) + '%';
    }

    // create new divs with color gradients at a random position and random color
    function makeCircle() {
        // check if function is working
        console.log("makeCircle()");
        const canvasContainer = document.querySelector("#canvas-container");
        var div = document.createElement("div");

        // add the div to the canvas container so it's visible
        canvasContainer.appendChild(div);

        // add the circle class to the div, showing the circle
        div.classList.add("circle");

        // randomize the position, color, and size of circle
        getRandomPos(div);
        div.style.backgroundColor = getRandomColor();
        div.style.transform = getRandomSize();

        // fade in the elements once they're made, and then fade them out
        $("#canvas-container").children().last().hide();
        $("#canvas-container").children().last().fadeIn(600).delay(3600).fadeOut(600);
    }

    $(document).on("keydown", function(e) {
        if ("abcdefghijklmnopqrstuvwxyz!,'.;:?(){}[]/&*^%$#@<>~-_+=0123456789".includes(e.key.toLowerCase())) {
            createLetter(e.key);
            makeCircle();
            deleteDivTimed();
        } else if (e.keyCode == 32){
            createLetter("&nbsp;");
            makeCircle();
            deleteDivTimed();
        }
        else if (e.keyCode == 8) {
            deleteElement();
        }
    }); 
});