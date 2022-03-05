function show() {
  var hiddenElement = document.getElementById("hidden");

  hiddenElement.classList.replace("hidden", "show");
}

function showSeahaven() {
  var hiddenElement = document.getElementById("hidden");

  hiddenElement.classList.replace("hidden", "show");
}

function showFlex() {
  var hiddenElement = document.getElementById("hidden");

  hiddenElement.classList.replace("hidden", "show-flex");
}

function showTV() {
  var hiddenElement = document.getElementById("hidden");
  var needToHideElement = document.getElementById("needToHide");
  var tvElement = document.getElementById("tvContent");

  hiddenElement.classList.replace("hidden", "show");

  needToHideElement.classList.add("hidden");

  tvElement.classList.replace("tv-content-background", "tv-content-transparent");
}

var text = [
  "Tonight, we present the enduring, much loved classic, &#8220;Show Me the Way To Go Home.&#8221;", 
  "A hymn of praise to small town life where we learn that you don't have to leave home to discover what the world's all about, and that no one's poor that has friends.", 
  "If you've ever felt lonely or sad, just look around you. No matter what trials and tribulations you face, there's people who care about you.",
  "In fact, why look elsewhere when everything you need is right here? That's a lesson the Abbots have certainly learned in the last episode.",
  "Full of laughter and love, pain and sadness, but ultimately redemption, we share in the highs and lows of the Abbot family.", 
  "Note the touching performance of Ronald Rearly as Uncle Bunny. And that scene with the bowl of cherries is gonna have you splitting your sides with laughter all over again.", 
  "And of course, there'll be tears too. Oh yes, when David and Jennifer are reunited.",
  "But enough from me! Let's join the Abbot family in Candon Village, so just make sure you don't go anywhere."
];
var counter = 0;
var elem = document.getElementById("changeText");
setInterval(change, 8000);

function change() {
    elem.classList.add('hideText');
    setTimeout(function () {
        elem.innerHTML = text[counter];
        elem.classList.remove('hideText');
        counter++;
        if (counter >= text.length) {
            counter = 0;
        }
    }, 500);
}

function tickerChange() {
  var ticker1 = document.getElementById("ticker-1");
  var ticker2 = document.getElementById("ticker-2");

  ticker1.style.display = "none";

  ticker2.classList.replace("hidden", "ticker-text");
}

function pause() {
  var tickerText = document.getElementById("ticker-text");

  tickerText.classList.toggle("pause");
}

function pauseAlt() {
  var tickerText1 = document.getElementById("ticker-1");
  var tickerText2 = document.getElementById("ticker-2");

  tickerText1.classList.toggle("pause");
  tickerText2.classList.toggle("pause");
}