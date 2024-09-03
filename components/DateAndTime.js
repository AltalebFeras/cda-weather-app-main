import React from 'react';
import { unixToLocalTime, isoToUnix } from './../services/converters';
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData }) => {
  // Ensure weatherData and required properties exist
  if (!weatherData || !weatherData.current?.time || !weatherData.timezone) {
    console.error("Invalid weatherData in DateAndTime:", weatherData);
    return <p>No data available</p>; // Gracefully handle missing or invalid data
  }

  // Convert ISO 8601 to Unix timestamp if necessary
  const timestamp = typeof weatherData.current.time === 'string' ? isoToUnix(weatherData.current.time) : weatherData.current.time;

  // Check if timestamp conversion is successful
  if (isNaN(timestamp)) {
    console.error("Invalid timestamp:", weatherData.current.time);
    return <p>Error with timestamp conversion</p>; // Handle conversion errors
  }

  // Create a Date object from the timestamp
  const dateInUtc = new Date(timestamp * 1000);

  // Convert UTC date to France time
  const options = { timeZone: 'Europe/Paris', weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: true };
  const formattedTime = dateInUtc.toLocaleTimeString('fr-FR', options);

  return (
    <div className={styles.wrapper}>
      <h2>{`${formattedTime}`}</h2>
    </div>
  );
};
