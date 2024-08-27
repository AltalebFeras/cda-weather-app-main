import React from 'react';
import { unixToLocalTime, isoToUnix } from './../services/converters';
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData }) => {
  if (!weatherData || !weatherData.dt || !weatherData.timezone) {
    console.error("Invalid weatherData in DateAndTime:", weatherData);
    return <p>No data available</p>; // Gracefully handle missing or invalid data
  }

  // Convert ISO 8601 to Unix timestamp if necessary
  const timestamp = typeof weatherData.dt === 'string' ? isoToUnix(weatherData.dt) : weatherData.dt;

  // Check if timestamp conversion is successful
  if (isNaN(timestamp)) {
    console.error("Invalid timestamp:", weatherData.dt);
    return <p>Error with timestamp conversion</p>; // Handle conversion errors
  }

  // Convert Unix timestamp to local time
  const time = unixToLocalTime(timestamp, weatherData.timezone);
  
  // Create a Date object from the timestamp
  const currentDate = new Date(timestamp * 1000);
  const weekDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  // Extract wind direction and visibility
  const windDirection = weatherData.current?.wind_direction || 'N/A';
  const visibility = weatherData.current?.visibility || 'N/A';
  
  return (
    <div className={styles.wrapper}>
      <h2>{`${weekDay}, ${formattedTime}`}</h2>
      <p>Wind Direction: {windDirection}°</p>
      <p>Visibility: {visibility} km</p>
    </div>
  );
};
