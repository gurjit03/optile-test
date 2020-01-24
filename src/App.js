import React from 'react';
import { WeatherWidget } from './Components/WeatherWidget';
import { GlobalStateProvider } from './store';
import { Typography } from '@material-ui/core';
import { toast } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export default function App() {
  return (
    <div className="App">
      <GlobalStateProvider>
        <Typography align="center" variant="h4" component="h1">
          Track the weather details
        </Typography>
        <WeatherWidget />
      </GlobalStateProvider>
    </div>
  );
}
