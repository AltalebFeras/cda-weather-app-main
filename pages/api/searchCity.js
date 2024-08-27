export default async function handler(req, res) {
    const { city } = req.body;
    const getWeatherData = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=fr&format=json`
    );
    const data = await getWeatherData.json();
    console.log(data);
    
    res.status(200).json(data);
  }