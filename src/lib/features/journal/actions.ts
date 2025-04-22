// src/lib/api-connector.ts

import { apiConnector } from "@/apis/api-connector";
import { JournalEntry, Mood, WeatherData } from "@/types/pokemon";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig, Method } from "axios";




// Weather API specific connector
export const fetchWeatherData = async (lat: number, lon: number) => {
  try {
    // Call your Next.js API route
    const response = await apiConnector(
      "get",
      `/api/weather?lat=${lat}&lon=${lon}`,
      null,
      {},
      undefined
    );

    return response.data;
  } catch (error: any) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

// Journal entries actions
export const addJournalEntry = createAsyncThunk(
  "journal/addEntry",
  async (
    data: { mood: Mood; notes: string; weather: WeatherData },
    { rejectWithValue }
  ) => {
    try {
      const newEntry: JournalEntry = {
        id: new Date().toString(),
        date: new Date().toISOString(),
        mood: data.mood,
        notes: data.notes,
        weather: data.weather,
      };

      return newEntry;
    } catch (error: any) {
      return rejectWithValue("Failed to add journal entry");
    }
  }
);

export const deleteJournalEntry = createAsyncThunk(
  "journal/deleteEntry",
  async (entryId: string, { rejectWithValue }) => {
    try {
      return entryId;
    } catch (error: any) {
      return rejectWithValue("Failed to delete journal entry");
    }
  }
);
