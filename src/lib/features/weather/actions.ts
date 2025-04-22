import { createAsyncThunk } from "@reduxjs/toolkit";
import { Coordinates, WeatherData } from "@/types/pokemon";
import { apiConnector } from "@/apis/api-connector";

export const fetchWeather = createAsyncThunk(
  "weather/fetch",
  async (coordinates: Coordinates, { rejectWithValue }) => {
    try {
      const response = await apiConnector(
        "get",
        `/api/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}`,
        null,
        {},
        undefined
      );

      const data = response.data;

      const transformedData: WeatherData = {
        description: data.weather?.[0]?.description || "Unknown",
        icon: data.weather?.[0]?.icon || "01d",
        temperature: data.main?.temp || 0,
        humidity: data.main?.humidity || 0,
        windSpeed: data.wind?.speed || 0,
        location: data.name || "Unknown Location",
      };

      return transformedData;
    } catch (error: any) {
      console.error("Error fetching weather data:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch weather data"
      );
    }
  }
);
