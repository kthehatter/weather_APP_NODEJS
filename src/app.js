const express = require("express");
const request = require("request");
const path = require("path");
const hbs = require("hbs");
const geocoding = require("./utilities/geocode");
const weather = require("./utilities/weather");
const app = express();
const port = process.env.PORT || 3000;
//***** Setting up paths for express configuration *******/
const publicPath = path.join(__dirname, "..", "public");
const viewsPath = path.join(__dirname, "..", "templates/views");
const partialsPath = path.join(__dirname, "..", "templates/partials");

//***** Setting up handlebars and view engine *******/
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//***** Setting up static files *******/
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Index",
    name: "Khalil",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "You must provide a location",
    });
  }
  geocoding(req.query.location, (error, responseG) => {
    if (responseG) {
      weather(responseG.latitude, responseG.longitude, (error, response) => {
        if (response) {
          res.send({
            location: responseG.location,
            weatherIcon: response.weather_icons,
            temperature: response.temperature,
            feelslike: response.feelslike,
            precip: response.precip,
            description: "it is currently " + response.temperature + " degree out. it feels like " + response.feelslike + " and there is a " + response.precip * 100 + "% chance of rain",
          });
        } else {
          res.send({
            error: error,
          });
        }
      });
    } else if (error) {
      res.send({
        error: error,
      });
    }
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Khalil",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Help",
    name: "Khalil",
  });
});
app.listen(port, () => {
  console.log("Example app listening on port "+port);
});

