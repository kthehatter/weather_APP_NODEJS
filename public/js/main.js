
const weather = document.getElementById('weather');
const locationInput = document.getElementById('locationArea');
const locationResult = document.getElementById('locationResult');
const locationForcast = document.getElementById('locationForcast');
const locationError = document.getElementById('locationError');
weather.addEventListener('submit', function(e) {
    e.preventDefault();
    var url = 
  fetch("/weather?location=" +encodeURIComponent(locationInput.value)  ).then(function(response) {
    return response.json();
  }).then(function(data) {
      if (data.error) {
    console.log(data.error);
    locationError.innerHTML = data.error;
    locationResult.innerHTML = "";
    locationForcast.innerHTML = "";
    }else{
      locationError.innerHTML = "";
        locationResult.innerHTML = data.location;
        locationForcast.innerHTML = data.description;}
   
  });
});