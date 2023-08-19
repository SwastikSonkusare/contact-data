import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import L from "leaflet"; // Import Leaflet

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const position = [51.505, -0.09];

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [worldData, setWorldData] = useState({});
  const [countriesData, setCountriesData] = useState([]);
  const [historialData, setHistorialData] = useState([]);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const [worldResponse, countriesResponse, historicalResponse] =
          await Promise.all([
            axios.get("https://disease.sh/v3/covid-19/all"),
            axios.get("https://disease.sh/v3/covid-19/countries"),
            axios.get(
              "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
            ),
          ]);

        setWorldData(worldResponse.data);
        setCountriesData(countriesResponse.data);
        setHistorialData(historicalResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const countriesMarkers = countriesData.map((country) => (
    <Marker
      key={country.country}
      position={[country.countryInfo.lat, country.countryInfo.long]}
      icon={L.icon({
        iconUrl: country.countryInfo.flag,
        iconSize: [25, 25],
      })}
    >
      <Popup position={position}>
        <div className="flex flex-col">
          <h2 className="text-2xl">{country.country}</h2>
          <p className="text-2xl">Active Cases: {country.active}</p>
          <p className="text-2xl">Recovered: {country.recovered}</p>
          <p className="text-2xl">Deaths: {country.deaths}</p>
        </div>
      </Popup>
    </Marker>
  ));

  const chartData = {
    labels: Object.keys(worldData || {}),
    datasets: [
      {
        label: "Cases",
        data: Object.values(worldData || {}),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  const historicalData = {
    labels: Object.keys(historialData.cases || {}),
    datasets: [
      {
        label: "Cases",
        data: Object.values(historialData.cases || {}),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
      {
        label: "deaths",
        data: Object.values(historialData.deaths || {}),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        fill: true,
      },
      {
        label: "recovered",
        data: Object.values(historialData.recovered || {}),
        borderColor: "rgba(15,192,112,1)",
        backgroundColor: "rgba(34,101,192,0.2)",
        fill: true,
      },
    ],
  };

  return (
    <>
      {isLoading ? (
        <h1 className="flex justify-center items-center w-full text-6xl">
          Loading
        </h1>
      ) : (
        <div className="flex flex-col w-full h-full">
          <h1 className="flex justify-center items-center w-full text-4xl mt-3">
            COVID-19 Dashboard
          </h1>

          <div className="flex justify-center items-center border-b-2 border-red-500 my-6">
            <Line data={chartData} />
          </div>
          <div className="flex justify-center items-center border-b-2 border-red-500 my-6">
            <Line data={historicalData} />
          </div>

          <MapContainer
            center={[0, 0]}
            zoom={2}
            style={{
              height: "100vh",
              width: "100%",
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {countriesMarkers}
          </MapContainer>
        </div>
      )}
    </>
  );
};

export default Dashboard;
