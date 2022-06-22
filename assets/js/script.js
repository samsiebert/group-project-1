
let lat = "38.63";
let lon = "-90.20";
let poiInput = "";
var poiInputEl = document.getElementById("poi-input");
var poiSearchBtn = document.getElementById("poi-submit");
var poiListContainerEl = document.getElementById("poi-list-container");
var apiUrl = "";

var poiFormHandler = function() {
    event.preventDefault();

    //collect desired point of interest category from poi form input element
    poiInput = poiInputEl.value.trim();
    //store lat, lon, and poi in api Url
    apiUrl = "https://us1.locationiq.com/v1/nearby.php?key=pk.be4835916052fb47cc94c4709411b9eb&lat=" + lat + "&lon=" + lon + "&tag=" + poiInput + "&radius=20000&format=json";

    //run api fetch function with url as argument
   getPois(apiUrl);
   poiInputEl.value = "";
};


//Function to fetch Point of Interest Search API data
var getPois = function(apiUrl) {
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    var poi = data;
                    console.log(poi);
                    //send data to function that prints to screen
                    printPois(poi);
                })
            //error message for invalid city entry
            } else {
                alert("Error: location not found!")
            }
        })
        //error message for failure to connect to api
        .catch(function(error) {
            alert("Unable to connect to maps host!");
        });
};

var printPois = function(poi) {

    poiListContainerEl.innerHTML = "";
    
    for (var i = 0; i < poi.length; i++) {
        var poiListItemEl = document.createElement("p");
        poiListItemEl.classList.add("list-item");
        poiListItemEl.textContent = poi[i].name;

        poiListContainerEl.appendChild(poiListItemEl);
      
    }
};


poiSearchBtn.addEventListener("click", poiFormHandler);

var cities = [];

var cityFormEl=document.querySelector("#city-search-form");
var citySearchInputEl = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var cityInputEl=document.querySelector("#city");

var formSumbitHandler = function(event){
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if(city){
        getCityWeather(city);
        get5Day(city);
        cityInputEl.value = "";
    } 
    saveSearch();
    pastSearch(city);
}

var saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};

var getCityWeather = function(city){
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

var get5Day = function(city){
    var apiKey = "844421298d794574c100e3409cee0499"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
           display5Day(data);
        });
    });
};

var display5Day = function(weather){
    forecastContainerEl.textContent = ""
    forecastTitle.textContent = "5-Day Forecast:";

    var forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8){
       var dailyForecast = forecast[i];
        
       
       var forecastEl=document.createElement("div");
       forecastEl.classList = "card";

      //create date element
       var forecastDate = document.createElement("date")
       forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header"
       forecastEl.appendChild(forecastDate);

       
       //create an image element
       var weatherIcon = document.createElement("img")
       weatherIcon.classList = "card-body";
       weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  

       //append icon to forecast card 
       forecastEl.appendChild(weatherIcon);
       
       //create temperature list
       var forecastTempEl=document.createElement("list");
       forecastTempEl.classList = "card-body";
       forecastTempEl.textContent = dailyForecast.main.temp + " °F";
       
       
       forecastEl.appendChild(forecastTempEl);

       var forecastHumEl=document.createElement("list");
       forecastHumEl.classList = "card-body";
       forecastHumEl.textContent = dailyForecast.main.humidity + "  %";

       //append to forecast card
       forecastEl.appendChild(forecastHumEl);

       //append to five day container
        forecastContainerEl.appendChild(forecastEl);
    }

}

cityFormEl.addEventListener("submit", formSumbitHandler);

