// src/components/ui/weather-display.tsx
"use client";

import React from 'react';
import { WeatherData } from '@/types/pokemon';
import { 
  SunIcon, 
  CloudIcon, 
  CloudArrowDownIcon,
  SnowIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, isLoading, error }) => {
  // Function to get appropriate weather icon based on OpenWeatherMap icon code
  const getWeatherIcon = (iconCode: string) => {
    if (!iconCode) return <SunIcon className="h-10 w-10 text-yellow-300" />;
    
    const code = iconCode.substring(0, 2);
    
    switch (code) {
      case '01': // clear sky
        return <SunIcon className="h-12 w-12 text-yellow-300 animate-float" />;
      case '02': // few clouds
      case '03': // scattered clouds
      case '04': // broken clouds
        return <CloudIcon className="h-12 w-12 text-gray-100 animate-float" />;
      case '09': // shower rain
      case '10': // rain
        return <CloudArrowDownIcon className="h-12 w-12 text-blue-300 animate-float" />;
      case '11': // thunderstorm
        return (
          <div className="relative animate-float">
            <CloudIcon className="h-12 w-12 text-gray-100" />
            <div className="absolute inset-0 flex items-center justify-center text-yellow-300 text-xl font-bold">⚡</div>
          </div>
        );
      case '13': // snow
        return <SnowIcon className="h-12 w-12 text-blue-100 animate-float" />;
      case '50': // mist/fog
        return <CloudIcon className="h-12 w-12 text-gray-400 opacity-70 animate-float" />;
      default:
        return <SunIcon className="h-12 w-12 text-yellow-300 animate-float" />;
    }
  };
  
  // Get appropriate background based on temperature
  const getTemperatureStyle = (temp: number) => {
    if (temp > 40) return { background: 'var(--weather-hot-bg)' };
    if (temp > 30) return { background: 'var(--weather-warm-bg)' };
    if (temp > 15) return { background: 'var(--weather-mild-bg)' };
    return { background: 'var(--weather-cold-bg)' };
  };

  if (isLoading) {
    return (
      <div className="rounded-lg bg-card/50 p-4 animate-pulse shadow-md">
        <div className="h-8 bg-muted rounded w-2/3 mb-2"></div>
        <div className="h-6 bg-muted rounded w-1/2"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="rounded-lg bg-destructive/20 p-4 text-destructive-foreground shadow-md">
        <div className="flex items-center">
          <ExclamationTriangleIcon className="h-6 w-6 mr-2" />
          <p>Error loading weather data. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="rounded-lg bg-card p-4 shadow-md">
        <p className="text-muted-foreground">Weather data not available</p>
      </div>
    );
  }

  return (
    <div 
      className="rounded-lg p-4 shadow-lg text-white overflow-hidden"
      style={getTemperatureStyle(weatherData.temperature)}
    >
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-2 md:mb-0">
          {getWeatherIcon(weatherData.icon)}
          <div className="ml-3">
            <h3 className="text-lg font-semibold">{weatherData.location}</h3>
            <p className="text-sm text-white/80 capitalize">{weatherData.description}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-3xl font-bold">{Math.round(weatherData.temperature)}°C</span>
          <div className="text-xs text-white/80">
            <span className="mr-2">Humidity: {weatherData.humidity}%</span>
            <span>Wind: {weatherData.windSpeed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;