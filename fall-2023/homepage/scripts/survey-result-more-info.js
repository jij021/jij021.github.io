// scroll to top ------------------------------------------------------------------------------------------------------
function scrollToTop() {
    window.scrollTo(0, 0);
}

document.getElementById("submitAll").addEventListener("click", function() {
    if (window.location.href.match('index.html') != null) {
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
})