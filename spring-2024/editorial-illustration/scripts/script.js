// wiggle the text a little
let text = document.querySelectorAll("p");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

text.forEach(function(el) {
    applyAnimation(el);
});

function applyAnimation(element) {
    var duration = Math.random() * 0.3 + 0.3; 
    var delay = Math.random() * 0.3;

    let roll = getRandomInt(2);

    if(roll == 0){
        element.style.animation = `wiggleAnimation1 ${duration}s linear ${delay}s infinite`;
    }
    else if(roll == 1){
        element.style.animation = `wiggleAnimation2 ${duration}s linear ${delay}s infinite`;
    }

}

// move objects away from cursor
// when the mouse moves, repel the elements nearby (if they're close enough)
document.addEventListener('mousemove', (e) => {
    repelElements(e);
});

function repelElements(event) {
    // get mouse positions
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const elements = document.querySelectorAll('p');

    elements.forEach((element) => {
        // transform values that already exist for the elements
        const currentTransform = getComputedStyle(element).transform;
        const currentMatrix = new DOMMatrix(currentTransform);

        // distance function
        const distance = calculateDistance(mouseX, mouseY, element);

        // if the cursor gets close enough to the element, move it
        if (distance.magnitude <= 500) {
            // move the element by 300 px
            const move = 300;
            const newTranslateX = currentMatrix.m41 + (distance.x * move);
            const newTranslateY = currentMatrix.m42 + (distance.y * move);

            // update the transform properties for the element
            element.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`;
        }
    });
}

// calc the distance between the mouse and the center of the element
function calculateDistance(mouseX, mouseY, element) {
    const rect = element.getBoundingClientRect();
    const elementX = rect.left + rect.width / 2;
    const elementY = rect.top + rect.height / 2;

    // determines difference between the cursor and center of the p elements
    const deltaX = mouseX - elementX;
    const deltaY = mouseY - elementY;

    // calcs the actual distance between the center of the element and the cursor using deltax and deltay (magnitude formula)
    const magnitude = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    return {
        x: -deltaX / magnitude,
        y: -deltaY / magnitude,
        magnitude: magnitude
    };
}