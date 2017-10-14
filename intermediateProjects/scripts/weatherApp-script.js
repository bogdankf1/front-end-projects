function convertToFarengeit(celesiumTemp) {
  return ((parseInt(celesiumTemp)*1.8) + 32).toFixed(0);
}
function convertToCelesium(farengeitTemp) {
  return ((parseInt(farengeitTemp) - 32) / 1.8).toFixed(0);
}
var temp = document.getElementById("temp-value");
document.getElementById("measuring-system").addEventListener("click", function () {
  if(document.getElementById("measuring-system").innerHTML == "°F") {
    document.getElementById("temp-value").innerHTML = convertToCelesium(parseInt(temp.innerHTML));
    document.getElementById("measuring-system").innerHTML = "°C";
  } else {
    document.getElementById("temp-value").innerHTML = convertToFarengeit(parseInt(temp.innerHTML));
    document.getElementById("measuring-system").innerHTML = "°F";
  }
});
 // Geolocation script begin
 var lat, lon;
 function getLocation() {
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
           lat  = position.coords.latitude;
           lon = position.coords.longitude;
           getCurrentWeather(lat, lon);
         });
     }
 }
// Geolocation script end
function getCurrentWeather(lat, lon){
  var urlString = "https://fcc-weather-api.glitch.me/api/current?"+
  "lon=" + lon + "&" + "lat=" + lat;
  $.ajax({
    url: urlString,
    success: function (result) {
      $("#city").text(result.name);
      $("#country").text(result.sys.country);
      $("#temp-value").text(result.main.temp + String.fromCharCode(176));
      $("#measuring-system").text($("#measuring-system").html());
      $("#details").text(result.weather[0].main);
      setWeatherIcon(result.weather[0].main);
    }
  });
}
function setWeatherIcon(conditions) {
  switch (conditions) {
    case "Clouds":
      $("#animation").html('<img src="logos/weather/021-cloud.png" height="200">');
      break;
    case "Snow":
      $("#animation").html('<img src="logos/weather/021-snowflake.png" height="200">');
      break;
    case "Rain":
      $("#animation").html('<img src="logos/weather/021-rain.png" height="200">');
      break;
    case "Sun":
      $("#animation").html('<img src="logos/weather/021-sun.png" height="200">');
      break;
    case "Clear":
      $("#animation").html('<img src="logos/weather/021-cloudy.png" height="200">');
      break;
    default:
      break;
  }
}
