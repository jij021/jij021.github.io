$(document).scroll(function(){
    if ($(document).scrollTop() > 400 ) {
        $('.main').addClass('active');
        $('.reveal-main').addClass('activetwo');
    }
     
    else {
        $('.main').removeClass('active');
        $('.reveal-main').removeClass('activetwo');
    }
 }); 