import { degToCompass } from "../services/converters";
import { getTime, getAMPM, getVisibility, getWindSpeed } from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ weatherData, unitSystem }) => {
  const { current, current_units } = weatherData;

  return (
    <div className={styles.wrapper}>
      <MetricsCard
        title={"Humidity"}
        iconSrc={"/icons/humidity.png"}
        metric={current.relative_humidity_2m}
        unit={current_units.relative_humidity_2m}
      />
      <MetricsCard
        title={"Wind speed"}
        iconSrc={"/icons/wind.png"}
        metric={getWindSpeed(unitSystem, current.wind_speed_10m)}
        unit={current_units.wind_speed_10m}
      />
      <MetricsCard
        title={"Wind direction"}
        iconSrc={"/icons/compass.png"}
        metric={degToCompass(current.wind_direction_10m)}
        unit={"°"}
      />
      <MetricsCard
        title={"Visibility"}
        iconSrc={"/icons/binocular.png"}
        metric={getVisibility(unitSystem, current.visibility)}
        unit={unitSystem === "metric" ? "km" : "miles"}
      />
      <MetricsCard
        title={"Sunrise"}
        iconSrc={"/icons/sunrise.png"}
        metric={getTime(unitSystem, weatherData.daily.sunrise[0], weatherData.utc_offset_seconds)}
        unit={getAMPM(unitSystem, weatherData.daily.sunrise[0], weatherData.utc_offset_seconds)}
      />
      <MetricsCard
        title={"Sunset"}
        iconSrc={"/icons/sunset.png"}
        metric={getTime(unitSystem, weatherData.daily.sunset[0], weatherData.utc_offset_seconds)}
        unit={getAMPM(unitSystem, weatherData.daily.sunset[0], weatherData.utc_offset_seconds)}
      />
    </div>
  );
};
