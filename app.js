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

// getWeather("tokyo");

const express = require("express");
const app = express();

// http://localhost:7000/
app.get("/", (req, res) => {
  res.send("Hello World!");
});
const port = 7000;
app.listen(port, () => {
  console.log(`app run on port http://localhost:${port}/`);
});
