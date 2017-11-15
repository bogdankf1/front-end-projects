$(document).ready(function () {
  // Script for preventing default scrolling (transition only by links in bottom and right screen side)
  $(document).on("wheel", function (event) {
    event.preventDefault();
  });
});
