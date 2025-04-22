// src/types/index.ts

export interface Mood {
  id: number;
  name: string;
  emoji: string;
  color: string; // Tailwind color class
}

export interface WeatherData {
  description: string;
  icon: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  location: string;
}

export interface JournalEntry {
  id: string;
  date: string; // ISO string format
  mood: Mood;
  notes: string;
  weather: WeatherData;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface JournalState {
  entries: JournalEntry[];
  isLoading: boolean;
  error: string | null;
}

export interface WeatherState {
  currentWeather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  coordinates: Coordinates | null;
}