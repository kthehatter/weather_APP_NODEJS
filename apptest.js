const request = require("request");
const geocoding = require("./utilities/geocode");
const weather = require("./utilities/weather");

const address = process.argv[2];

if (!address) {
  console.log("Please provide an address");
}else{

geocoding(address,(error, response)=>{
  if(response){
    console.log(response.location);
    weather(response.latitude, response.longitude, (error, response)=>{
      if(response){
        console.log(
          "it is currently " +
            response.temperature +
            " degree out. it feels like " +
            response.feelslike +
            " and there is a " +
            response.precip * 100 +
            "% chance of rain"
        );
      }else{
        console.log(error);
      }
    });
  }else if(error){
    console.log(error);
  }
})
}

// const geolocationurl =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoia3RoZWhhdHRlciIsImEiOiJja3RmejFyOXIwZDgyMnBqb3owZ2JuZ3VxIn0.Q22YF4vvC4xVaK8tx3mHOw&limit=1";
// request({ url: geolocationurl, json: true }, (error, response, body) => {
//   if (response && response.statusCode === 200) {
//     //const data = JSON.parse(body);
//     const laltitude = body.features[0].center[1];
//     const longitude = body.features[0].center[0];
//     //console.log(laltitude, longitude);
//     var R = 6371;
//     var dLat = deg2rad(laltitude - 36.5897); // deg2rad below
//     var dLon = deg2rad(longitude - 2.4475);
//     var a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(36.5897)) *
//       Math.cos(deg2rad(laltitude)) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     var d = R * c; // Distance in km
//     console.log("the distance is: ", d);
//   } else {
//     console.log("error", error);
//   }
// });
// function deg2rad(deg) {
//   return deg * (Math.PI / 180);
// }
