import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";
import { unixToLocalTime, isoToUnix } from './../services/converters'; 

export const DateAndTime = ({ weatherData, unitSystem }) => {
  if (!weatherData || !weatherData.dt || !weatherData.timezone) {
    console.error("Invalid weatherData in DateAndTime:", weatherData);
    return null; // Gracefully handle missing or invalid data
  }

  // Convert ISO 8601 to Unix timestamp if necessary
  const timestamp = typeof weatherData.dt === 'string' ? isoToUnix(weatherData.dt) : weatherData.dt;
  
  const time = unixToLocalTime(timestamp, weatherData.timezone);
  const currentDate = new Date(timestamp * 1000);
  const weekDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className={styles.wrapper}>
      <h2>
        {`${weekDay}, ${time}`}
      </h2>
    </div>
  );
};
