// declare local variable to being update in function what call API
var forecast;

var row = document.querySelector(".row");
var searchInput = document.querySelector(".form-control"); 
var btn = document.querySelector(".btn");

//calling Api to get data from it
async function callAPI(location) {
  var getData = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=028b41596f1a4f06ba1131440252209&q=${location}&days=3&aqi=no&alerts=no`
  );

  var response = await getData.json();

  forecast = response.forecast.forecastday;

  display(forecast, response.location.name);
}

// make a somethig fixed to when user open appear card of 3 days of weather statue to any country (for example "giza")
callAPI("giza");

// display function
function display(forecast, city) {
  var cartona = "";

  for (var i = 0; i < forecast.length; i++) {
    cartona += `
      <div class="col-md-4">
        <div class="inner text-center rounded-4 p-5">
          <h5 class="mb-3">${forecast[i].date}</h5>
          <h3>${city}</h3>
          <div class="temp">
            ${forecast[i].day.avgtemp_c}<span class="fs-5">C</span>
          </div>
          <div class="my-3">
            <img src="https:${forecast[i].day.condition.icon}" alt="${forecast[i].day.condition.text}">
            <span>${forecast[i].day.condition.text}</span>
          </div>
          <p>Humidity: ${forecast[i].day.avghumidity}% | Wind: ${forecast[i].day.maxwind_kph} km/h</p>
        </div>
      </div>
    `;
  }

  row.innerHTML = cartona;
}

// search function

btn.addEventListener("click", function () {
  callAPI(searchInput.value);
});
