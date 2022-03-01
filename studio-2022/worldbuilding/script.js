function show() {
  var hiddenElement = document.getElementById("hidden");

  hiddenElement.classList.replace("hidden", "show");
}

function showFlex() {
  var hiddenElement = document.getElementById("hidden");

  hiddenElement.classList.replace("hidden", "show-flex");
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