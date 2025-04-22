"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEntry } from "@/lib/features/journal";
import { RootState } from "@/lib/store";
import MoodSelector, { moods } from "./mood-selector";
import WeatherDisplay from "./weather-display";
import { Mood } from "@/types/pokemon";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { formatDate } from "@/helpers/helper";

const MoodJournalForm: React.FC = () => {
  const dispatch = useDispatch();
  const {
    currentWeather,
    isLoading: weatherLoading,
    error: weatherError,
  } = useSelector((state: RootState) => state.weather);

  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Set default mood based on temperature if extreme
  useEffect(() => {
    if (currentWeather && !selectedMood) {
      if (currentWeather.temperature > 40) {
        // Auto-suggest "Angry" mood for very hot temperatures
        const hotMood = moods.find((m) => m.name === "Angry");
        if (hotMood) {
          setSelectedMood(hotMood);
          setNotification({
            message:
              "It's extremely hot today! We've suggested a mood, but please change it if it doesn't match how you feel.",
            type: "success",
          });
          setTimeout(() => setNotification(null), 5000);
        }
      }
    }
  }, [currentWeather, selectedMood]);

  // Handle mood selection
  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMood) {
      setNotification({
        message: "Please select a mood",
        type: "error",
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    if (!currentWeather) {
      setNotification({
        message: "Weather data not available",
        type: "error",
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    setSubmitting(true);

    try {
      dispatch(
        addEntry({
          mood: selectedMood,
          notes: notes,
          weather: currentWeather,
        })
      );

      // Reset form
      setSelectedMood(null);
      setNotes("");

      // Show success notification
      setNotification({
        message: "Journal entry saved successfully!",
        type: "success",
      });
    } catch (error) {
      setNotification({
        message: "Failed to save journal entry",
        type: "error",
      });
    } finally {
      setSubmitting(false);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-gray-800 dark:text-gray-100 animate-fade-in">
      {/* Current Date */}
      <h2 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
        {formatDate(new Date().toDateString())}
      </h2>

      {/* Weather Display */}
      <div className="mb-6">
        <WeatherDisplay
          weatherData={currentWeather}
          isLoading={weatherLoading}
          error={weatherError}
        />
      </div>

      {/* Temperature Warning */}
      {currentWeather && currentWeather.temperature > 40 && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md flex items-start animate-slide-up">
          <ExclamationTriangleIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
          <p>
            Temperature is extremely high today (
            {Math.round(currentWeather.temperature)}°C). Keep yourself hydrated
            and try to stay in cool areas.
          </p>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div
          className={`mb-4 p-3 rounded-md animate-slide-up ${
            notification.type === "success"
              ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
              : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
          }`}
        >
          {notification.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="animate-slide-up">
        {/* Mood Selector */}
        <MoodSelector
          selectedMood={selectedMood}
          onMoodSelect={handleMoodSelect}
        />

        {/* Notes Input */}
        <div className="mb-6">
          <label
            htmlFor="notes"
            className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400"
          >
            Journal Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 border bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
            rows={4}
            placeholder="How are you feeling today? What's on your mind?"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting || !selectedMood}
          className={`w-full py-3 rounded-md font-medium text-white transition-colors ${
            submitting
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              : selectedMood
              ? "bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600"
              : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
          }`}
        >
          {submitting ? "Saving..." : "Save Journal Entry"}
        </button>
      </form>
    </div>
  );
};

export default MoodJournalForm;
