let on = true;
let aboutOutline = document.querySelector("#about-outline");
let aboutFilled = document.querySelector("#about-filled");
let aboutText = document.querySelector("#about-text");

function toggle() {
	if (on) { fadeIn(); } else { fadeOut(); }
	on = !on;
}

function fadeOut(){
	aboutText.style.opacity = 0;
    aboutOutline.style.display = "block";
    aboutFilled.style.display = "none";
}

function fadeIn(){
	aboutText.style.opacity = 1;
    aboutOutline.style.display = "none";
    aboutFilled.style.display = "block";
}

document.querySelector("#about").addEventListener('click', () => {
    toggle();
    document.querySelector("nav").classList.toggle("lower-opacity");
    document.querySelector("main").classList.toggle("lower-opacity");
});