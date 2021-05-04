/* Create something to search a city and add it to the search history. Add the current weather data attributes to elements dor user to see.
UvIndex needs to have a color that represents the conditions. Create 5 elements that displays  day forecast with the current data attributes.
*/

//Creating all variables
var myKey = "094ff2fa112c80cd9451fbf9613c1dea";
var searchButton = $("#searchButton");
var cityEl = $("#city");
var dateEl = $("#date");
var tempEl = $("#temperature");
var humidEl = $("#humidity");
var windEl = $("#wind");
var uvEl = $("#uvIndex");
var fiveDayEl = $("#fiveDay");
var historyButtonsEl = $(".btn-group");
var icon = $("#icon");
var deck = $(".card-deck");

var today = moment().format("dddd, MMMM Do YYYY");
//console.log(today);

//localStorage.setItem("History", JSON.stringify(getCity));

var historyList = JSON.parse(localStorage.getItem("historyList") || "[]");
//console.log(historyList);

$("#searchButton").click(function () {
  var getCity = $("#UserInput").val();
  $(".list-group").prepend("<button btn-primary p-3>" + getCity + "</button>");
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
      var today = moment(data.dt, "X").format("MM/DD/YYYY");
      //Set the text items in the html
      var iconurl =
        "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      icon.attr("src", iconurl);
      cityEl.text(data.name);
      dateEl.text(today);
      tempEl.text(data.main.temp);
      humidEl.text(data.main.humidity);
      windEl.text(data.wind.speed);

      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${myKey}&units=imperial`
      )
        .then(function (reply) {
          console.log(reply);
          return reply.json();
        })
        .then(function (uvData) {
          console.log(uvData);

          //Does not properly set the color
          if (uvData.current.uvi < 3) {
            uvEl
              .text(uvData.current.uvi)
              .attr("style", "background-color: green");
          } else if (uvData.current.uvi < 7) {
            uvEl
              .text(uvData.current.uvi)
              .attr("style", "background-color: yellow");
          } else if (uvData.current.uvi < 11) {
            uvEl
              .text(uvData.current.uvi)
              .attr("style", "background-color: red");
          } else {
            uvEl
              .text(uvData.current.uvi)
              .attr("style", "background-color: marroon", "color: white");
          }
        });
    });

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${getCity}&appid=${myKey}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data);

      deck.empty();
      for (var i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.includes("12:00:00")) {
          console.log(data.list[i]);
          var icon =
            "http://openweathermap.org/img/w/" +
            data.list[i].weather[0].icon +
            ".png";
          var date = moment(data.list[i].dt, "X").format("MM/DD/YYYY");
          var temp = data.list[i].main.temp;
          var wind = data.list[i].wind.speed;
          var humid = data.list[i].main.humidity;

          deck.append(`   
             <div class="card">
          <div class="card-body">
            <img src="${icon}" alt="" />
            <p>Date: ${date}</p>
            <p>temp: ${temp}</p>
            <p>wind: ${wind}</p>
            <p>humidity: ${humid}</p>
          </div>
        </div>
`);
        }
      }
    });
});

$(".list-group").click(function (event) {
  $.getJSON(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      event.target.innerText +
      "&appid=" +
      myKey +
      "&units=imperial",
    function (data) {
      var iconurl =
        "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      icon.attr("src", iconurl);
      cityEl.text(data.name);
      dateEl.text(today);
      tempEl.text(data.main.temp);
      humidEl.text(data.main.humidity);
      windEl.text(data.wind.speed);
    }
  );
});
