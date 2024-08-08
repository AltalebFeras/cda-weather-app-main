export default async function handler(req, res) {
  const { latitude, longitude, timezone } = req.body.geoData;
  const getWeatherData = await fetch(
    `https://api.open-meteo.com/v1/forecast?` +
    `latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&` +
    `hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,weather_code,pressure_msl,surface_pressure,visibility,is_day,temperature_1000hPa&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,rain_sum,showers_sum,snowfall_sum,wind_speed_10m_max,wind_gusts_10m_max&timezone=Europe%2FBerlin&forecast_days=1&models=best_match`
  );
  const data = await getWeatherData.json();
  res.status(200).json(data);
}
