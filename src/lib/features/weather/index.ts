// src/store/slices/weather-slice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWeather } from "./actions";
import { Coordinates, WeatherState } from "@/types/pokemon";

const initialState: WeatherState = {
  currentWeather: null,
  coordinates: null,
  isLoading: false,
  error: null
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCoordinates: (state, action: PayloadAction<Coordinates>) => {
      state.coordinates = action.payload;
    },
    clearWeather: (state) => {
      state.currentWeather = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        console.log(action,"action");
        
        state.isLoading = false;
        state.currentWeather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setCoordinates, clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;