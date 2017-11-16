$(document).ready(function () {
  // Script for smooth scrolling beetween blocks

  // ,.meeting, .about, .projects, .footer
  $(".transition a, .nav a, .go-top").on("click", function (event) {
    event.preventDefault();

    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
  });
});
