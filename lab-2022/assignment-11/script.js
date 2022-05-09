// original: Virtual Keyboard Activity by Adi Jaya
// https://codepen.io/onclick_indo/pen/WNeBXgx

// Reflection:

// I was drawn to this code because my Studio project also focuses on keyboard interactions. I find it interesting to see my keypresses show up on the screen as well via the virtual keyboard since I don’t look at the keyboard as I type, so it gives a visual representation of what’s happening while I’m not looking. I also like that this code allows you to view the keyboard at different sizes to give the user more control over the experience. By annotating the code, I hope to gain a better understanding of how to use more complicated keyboard interactions in my future work, especially since this code uses the entire keyboard to function, which I wasn’t able to do in my own project.

// select the window
var selectorEvent = $(window);

// https://keycode.info/ for keycodes
// assigns an array of keycodes to keyPreventDefault
var keyPreventDefault = [
    "112", // F1
    "114", // F3
    "116", // F5
    "117"  // F6
];

// function that prevents default actions for certain keys (ie the keys in the keyPreventDefault array)
// attaches event handler on the selectorEvent variable; event fired when a key is pressed
selectorEvent.on("keydown", function (event) {
    // key variable assigned to event.keyCode, which gives the unicode value of the pressed key
    var key = event.keyCode;
    // for every value in the keyPreventDefault array, if the key pressed matches any of these array values, the default event for that key doesn't fire
    for (var i in keyPreventDefault) {
        if (key == keyPreventDefault[i]) {
            event.preventDefault();
        }
    }
    
    // if the capslock is pressed, toggle the active class to the key, which makes the capslock key on the virtual keyboard stay blue
    // otherwise, add the active class
    if (key == 20) 
    {
        $(".key[data-key='" + key + "']").toggleClass("active");
    } else {
        $(".key[data-key='" + key + "']").addClass("active");
    }
});

// function that checks if the caps lock is on
// attaches event handler on selectorEvent variable; when key is up, an event fires
selectorEvent.on("keyup", function (event) {
    // key variable assigned to event.keyCode, which gives the unicode value of the pressed key
    var key = event.keyCode;
    // if the capslock is not pressed, remove the active class
    if (key != 20) 
    {
        $(".key[data-key='" + key + "']").removeClass("active");
    }
});

// function that changes the size of the virtual keyboard
// attaches event handler on document; alters something when "change-size" class is involved
$(document).on("change", ".change-size", function (event) {
    // assigns keyboard class to keyboard variable; this focuses on the virtual keyboard
    var keyboard = $(".keyboard");
    // assigns this value to the value variable
    var value = $(this).val();
    // changes the css value of the keyboard, changing the font size with the value variable
    keyboard.css({
        "font-size": value + "px"
    });
});

// detects if capslock is on
// attaches event handler on selectorEvent variable; when key is pressed, an event fires
selectorEvent.on( "keypress", function( event ){
    //  checks if the capslock is on via a boolean value
	var CapsLock =  event.originalEvent.getModifierState("CapsLock");
    // if the capslock is on, add the active class to the capslock key
	if( CapsLock == true  ){
		$( ".key[data-key='20']" ).addClass( "active" );
	}
});