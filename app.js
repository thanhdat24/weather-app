const async_request = require("async-request");

const getWeather = async (location) => {
  const ACCESS_KEY = "899c062d78c0f921705db195996d3280";
  const url = `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${location}`;
  try {
    const res = await async_request(url);
    const data = JSON.parse(res.body);
    const weather = {
      isSuccess: true,
      region: data.location.region,
      country: data.location.country,
      temperature: data.current.temperature,
      wind_speed: data.current.wind_speed,
      precip: data.current.precip,
      cloudcover: data.current.precip,
    };
    console.log(weather);
    return weather;
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      error,
    };
  }
};

const express = require("express");
const app = express();
const path = require("path");

const pathPublic = path.join(__dirname, "./public");
app.use(express.static(pathPublic));

// http://localhost:7000/
app.get("/", async (req, res) => {
  const params = req.query;
  const location = params.address;
  const weather = await getWeather(location);
  console.log(weather);
  res.render("weather", {
    region: weather.region,
    country: weather.country,
    temperature: weather.temperature,
    wind_speed: weather.wind_speed,
    precip: weather.precip,
    cloudcover: weather.cloudcover,
  });
});

app.set("view engine", "hbs");

const port = 7000;
app.listen(port, () => {
  console.log(`app run on port http://localhost:${port}/`);
});
