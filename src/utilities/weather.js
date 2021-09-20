const request = require("request");
const weather = (latitude, longitude, callback) => {
    const url =
    "http://api.weatherstack.com/forecast?access_key=5b581eecca42a6f9d4c5c2a1c05d0c5c&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);
  request({ url: url, json: true }, (error, response, body) => {
    if (response && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
        precip: body.current.precip * 100,
        weatherIcon: body.current.weather_icons,
      });
      
    } else if (error) {
      callback("unable to connect to the server", undefined);
    }
    else{
      callback("unable to connect to the api",undefined);
    }
  });
}
module.exports = weather;