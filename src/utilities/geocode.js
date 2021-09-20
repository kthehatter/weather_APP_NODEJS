const request = require("request");
const geocoding = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address) +
      ".json?access_token=pk.eyJ1Ijoia3RoZWhhdHRlciIsImEiOiJja3RmejFyOXIwZDgyMnBqb3owZ2JuZ3VxIn0.Q22YF4vvC4xVaK8tx3mHOw&limit=1";
    request({ url: url, json: true }, (error, response, body) => {
      if (response && response.statusCode === 200) {
        if (body.features.length === 0) {
          callback("Unable to find location", undefined);
        }
        else{
          const data = body.features[0];
          const latitude = data.center[1];
          const longitude = data.center[0];
          callback(undefined, {
            latitude: latitude,
            longitude: longitude,
            location: data.place_name
          });
        }
        
      } else if (error) {
        callback("unable to connect to the server", undefined);
      }
      else{
        callback("unable to connect to the api",undefined);
      }
    }); 
  }
module.exports = geocoding;