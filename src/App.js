import React from "react";
import { WeatherWidget } from "./Components/WeatherWidget";
import "antd/dist/antd.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className="App">
      <h1 className="header">Track the weather details</h1>
      <WeatherWidget />
    </div>
  );
}
