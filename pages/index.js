import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";
import settings from "../config.json";
import { getWeatherCode } from "../services/helpers";

export const App = () => {
  const city = settings.city;
  const [geoData, setGeoData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");
  const [timer, setTimer] = useState(0);

  // Refresh timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 3600000); // 1 hour
    return () => clearInterval(interval);
  }, []);

  // Fetch GeoData
  useEffect(() => {
    const getGeoData = async () => {
      try {
        const res1 = await fetch("api/searchCity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city }),
        });

        const geo = await res1.json();

        if (geo.results && geo.results[0].name) {
          setGeoData({ ...geo.results[0] });
        } else {
          setWeatherData({ error: "City not found" });
        }
      } catch (error) {
        setWeatherData({ error: "Failed to fetch geo data" });
        console.error("Error fetching geo data:", error);
      }
    };

    getGeoData();
  }, [city]);

  // Fetch WeatherData
  useEffect(() => {
    const getWeatherData = async () => {
      if (geoData) {
        try {
          const res2 = await fetch("api/data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ geoData }),
          });
          const data = await res2.json();

          if (data.daily) {
            const weatherCodeAttributes = getWeatherCode(
              data.daily.weather_code[0],
              data.daily.is_day
            );
            setWeatherData({
              ...data,
              description: weatherCodeAttributes.description,
              iconName: weatherCodeAttributes.iconName,
              geoData: geoData,
            });
          } else {
            setWeatherData({ error: "Data unavailable" });
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setWeatherData({ error: "Failed to fetch weather data" });
        }
      }
    };

    getWeatherData();
  }, [timer, geoData]);

  const changeSystem = () =>
    unitSystem === "metric"
      ? setUnitSystem("imperial")
      : setUnitSystem("metric");

  return weatherData && !weatherData.error ? (
    <div className={styles.wrapper}>
      <MainCard
  city={geoData.name}
  country={geoData.country_code}
  description={weatherData.description}
  iconName={weatherData.iconName}
  unitSystem={unitSystem}
  weatherData={weatherData} 
/>

      <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
        </Header>
        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  ) : weatherData && weatherData.error ? (
    <ErrorScreen errorMessage={weatherData.error} />
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;
