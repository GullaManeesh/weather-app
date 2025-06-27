export const getWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=hyderbad&appid=${
    import.meta.env.VITE_API_KEY
  }&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
};
