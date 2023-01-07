import React, { useState, useEffect } from "react";
import "./style.css";
import WeatherDetails from "./WeatherDetails";

const SearchMain = () => {
  const [searchTerm, setSearchTerm] = useState("ohrid");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=3824afd72ca01c335e700d9ca402f8d6
`;
      let res = await fetch(url);
      let data = await res.json();

      const { temp, pressure, humidity } = data.main;
      const { main: weatherType } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherType,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  });
  return (
    <>
      <div className="wrap">
        <div className="search">
          <br />
          <input
            type="text"
            placeholder="type city name.."
            id="search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="searchButton" onClick={getWeatherInfo}>
          Search
        </button>
      </div>
      <WeatherDetails {...tempInfo} />
    </>
  );
};

export default SearchMain;
