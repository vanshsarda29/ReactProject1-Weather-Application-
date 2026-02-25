import { useState } from "react";
import "./App.css";
function App() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("C");
  const API_KEY = 'ee7a116a67fdabc1507200d0c26dfc4a';

  const handleSearch = async () => {
  if (!city.trim()) return;

  setLoading(true);
  setError("");
  setWeather(null);

  try {
    const cleanCity = city.trim();

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        cleanCity
      )}&appid=${API_KEY}&units=metric`
    );

    const data = await res.json();

    console.log("API response:", data);

    if (data.cod !== 200) {
      throw new Error(data.message || "City not found");
    }

    setWeather({
      city: data.name,
      temp: data.main.temp,
      condition: data.weather[0].main,
      icon: data.weather[0].icon,
    });
  } catch (err) {
    console.log("Error:", err);
    setError("City not found or API issue");
  }

  setLoading(false);
};

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Weather App</h1>

      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />

      <br/><br/>
      <div className="btns">
        <button onClick={handleSearch}>Search</button>

        <button onClick={() => setUnit(unit === "C" ? "F" : "C")}>
          Switch to °{unit === "C" ? "F" : "C"}
        </button>
      </div>
      

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "20px" }}>
          <h2>{weather.city}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="icon"
          />
          <p>
            {unit === "C"
              ? weather.temp.toFixed(1)
              : ((weather.temp * 9) / 5 + 32).toFixed(1)} °{unit}
          </p>
          <p>{weather.condition}</p>
        </div>
      )}
    </div>
  );
}

export default App;