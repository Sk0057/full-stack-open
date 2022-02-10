import React, { useState, useEffect } from "react";
import weather_data from "./weather_data.json";
import axios from "axios";

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(weather_data);

  const api_key = process.env.REACT_APP_API_KEY;
  const capital = country.capital[0];

  const weatherHook = () => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
      )
      .then(
        (request) => setWeather(request.data),
        (error) => console.log(error)
      );
  };

  useEffect(weatherHook, [capital, api_key]);

  const windDirection = () => {
    const dirArray = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
      "N",
    ];
    const dirIndex = Math.round(weather.wind.deg / 22.5);
    return dirArray[dirIndex];
  };

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>
        <b>Temperature:</b> {weather.main.temp} Celcius
        <br />
        <b>Feels like:</b> {weather.main.feels_like} Celcius
        <br />
        <b>Wind:</b> {weather.wind.speed} direction {windDirection()}
      </p>
    </div>
  );
};

export default Weather;
