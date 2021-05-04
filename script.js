/* Create something to search a city and add it to the search history. Add the current weather data attributes to elements dor user to see.
UvIndex needs to have a color that represents the conditions. Create 5 elements that displays  day forecast with the current data attributes.
*/

//Creating all variables
var myKey = "094ff2fa112c80cd9451fbf9613c1dea";
var searchButton = $("#searchButton");
var clearButton = $("#clearButton");
var cityDateEl = $("#cityAndDate");
var tempEl = $("#temperature");
var humidEl = $("#humidity");
var windEl = $("#wind");
var uvEl = $("#uvIndex");
var searchHistory = $(".searchHistory");
var futureForecastEl = $("#fiveDayForecast");
var historyButtonsEl = $(".btn-group");

var today = moment().format("dddd, MMMM Do YYYY");
//console.log(today);

var historyList = JSON.parse(localStorage.getItem("historyList") || "[]");
//console.log(historyList);

// $(document).ready(function () {
//   var getCity = $("userInput").val();
//   $("#getCity").text(getCity);
//

$("#searchButton").click(function () {
  var getCity = $("#UserInput").val();
  $(".list-group").append("<button btn-primary>" + getCity + "</button>");
  console.log(getCity);

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      getCity +
      "&appid=" +
      myKey +
      "&units=imperial"
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //Set the text items in the html
      tempEl.text(data.main.temp);
      humidEl.text(data.main.humidity);
      windEl.text(data.wind.speed);
    });
});
