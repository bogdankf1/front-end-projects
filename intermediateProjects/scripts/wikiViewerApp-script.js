function findArticle() {
  var request = $("#search").val();
  var urlString = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + request + "&format=json&callback=?";
  $.ajax({
    type: "GET",
    url: urlString,
    dataType: "json",
    success: function (data) {
        for (var i = 0; i < data[1].length; i++) {
          $("#wiki-list").fadeIn("slow");
          $("#wiki-list").append("<div><a target='blank' href="+data[3][i]+"><h2>"+data[1][i]+"</h2></a>"+"<p>"+data[2][i]+"</p></div><hr>");
        }
    }
  });
}
$("#search-button").click(function (event) {
  event.preventDefault();
  findArticle();
});
