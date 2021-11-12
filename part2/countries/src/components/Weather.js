import axios from "axios";
import React, { useEffect, useState } from "react";

const Weather = ({ city }) => {
  let weatherApiKey = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState({});
  const {temp, wind, direction, imageURL} = weather

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${city}&units=m`
      )
      .then((res) => setWeather({
        temp: res.data.current.temperature,
        wind: res.data.current.wind_speed,
        direction: res.data.current.wind_dir,
        imageURL: res.data.current.weather_icons[0],
      }));
  }, [city]);

  return (
    <div>
      <h1>Weather in {city}</h1>
      <p>
        <b>tempeture:</b> {temp} Celcius
      </p>
      <img src={imageURL} alt="weather" />
      <p>
        <b>wind:</b> {wind} km/h direction {direction}
      </p>
    </div>
  );
};

export default Weather;
