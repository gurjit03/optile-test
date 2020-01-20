import React from "react";
import { WeatherWidget } from "./Components/WeatherWidget";
import { GlobalStateProvider } from "./store";
import { Typography } from "@material-ui/core";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div className="App">
      <GlobalStateProvider>
        <Typography variant="h2">Track the weather details</Typography>
        <WeatherWidget />
      </GlobalStateProvider>
    </div>
  );
}
