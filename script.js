/* Create something to search a city and add it to the search history. Add the current weather data attributes to elements dor user to see.
UvIndex needs to have a color that represents the conditions. Create 5 elements that displays  day forecast with the current data attributes.
*/

//Creating all variables
var myKey = "094ff2fa112c80cd9451fbf9613c1dea";
var userInput = $(".userInput");
var searchButton = $(".searchButton");
var cityEl = $(".cityName");
var dateEl = $(".currentDate");
var iconEl = $(".Icon");
var tempEl = $(".temperature");
var humidEl = $(".humidity");
var windEl = $(".wind");
var uvEl = $(".uvIndex");
var searchHistory = $(".searchHistory");
var futureForecastEl = $(".card-row");

var today = moment().format("dddd, MMMM Do YYYY");
console.log(today);

var historyList = JSON.parse(localStorage.getItem("historyList") || "[]");

function searchHistory(cityEl) {
  for (i = 0; i < historyList; i++) {
    var newItem = $("<li>").attr("class", "searchHistory");
    newItem.text(historyList[i]);
    cityEl.prepend(newItem);
  }
}

$(document).on("click", "historyBtn", function () {
  console.log("Got here");
});
