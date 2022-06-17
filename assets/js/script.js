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