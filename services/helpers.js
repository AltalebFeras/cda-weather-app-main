import {
  unixToLocalTime,
  kmToMiles,
  mpsToMph,
  timeTo12HourFormat,
} from "./converters";

export const getWindSpeed = (unitSystem, windInMps) =>
  unitSystem == "metric" ? windInMps : mpsToMph(windInMps);

export const getVisibility = (unitSystem, visibilityInMeters) =>
  unitSystem == "metric"
    ? (visibilityInMeters / 1000).toFixed(1)
    : kmToMiles(visibilityInMeters / 1000);

export const getTime = (unitSystem, currentTime, timezone) =>
  unitSystem == "metric"
    ? unixToLocalTime(currentTime, timezone)
    : timeTo12HourFormat(unixToLocalTime(currentTime, timezone));

export const getAMPM = (unitSystem, currentTime, timezone) =>
  unitSystem === "imperial"
    ? unixToLocalTime(currentTime, timezone).split(":")[0] >= 12
      ? "PM"
      : "AM"
    : "";

export const getWeekDay = (weatherData) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[
    new Date((weatherData.dt + weatherData.timezone) * 1000).getUTCDay()
  ];
};
const weatherCodeMap = {
  0: { description: "Clear sky", iconBase: "01" },
  1: { description: "Mainly clear", iconBase: "02" },
  2: { description: "Partly cloudy", iconBase: "03" },
  3: { description: "Overcast", iconBase: "04" },
  45: { description: "Fog", iconBase: "50" },
  48: { description: "Depositing rime fog", iconBase: "50" },
  51: { description: "Light drizzle", iconBase: "09" },
  53: { description: "Moderate drizzle", iconBase: "09" },
  55: { description: "Dense drizzle", iconBase: "09" },
  56: { description: "Light freezing drizzle", iconBase: "09" },
  57: { description: "Dense freezing drizzle", iconBase: "09" },
  61: { description: "Slight rain", iconBase: "10" },
  63: { description: "Moderate rain", iconBase: "10" },
  65: { description: "Heavy rain", iconBase: "10" },
  66: { description: "Light freezing rain", iconBase: "13" },
  67: { description: "Heavy freezing rain", iconBase: "13" },
  71: { description: "Slight snow fall", iconBase: "13" },
  73: { description: "Moderate snow fall", iconBase: "13" },
  75: { description: "Heavy snow fall", iconBase: "13" },
  77: { description: "Snow grains", iconBase: "13" },
  80: { description: "Slight rain showers", iconBase: "09" },
  81: { description: "Moderate rain showers", iconBase: "09" },
  82: { description: "Violent rain showers", iconBase: "09" },
  85: { description: "Slight snow showers", iconBase: "13" },
  86: { description: "Heavy snow showers", iconBase: "13" },
  95: { description: "Thunderstorm", iconBase: "11" },
  96: { description: "Thunderstorm with slight hail", iconBase: "11" },
  99: { description: "Thunderstorm with heavy hail", iconBase: "11" },
};

export const getWeatherCode = (code, isDay) => {
  const weatherData = weatherCodeMap[code] || {
    description: "Unknown",
    iconBase: "unknown",
  };
  
  const iconName = `${weatherData.iconBase}${isDay ? "d" : "n"}`;
  
  return {
    description: weatherData.description,
    iconName,
  };
};

