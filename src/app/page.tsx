"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCoordinates } from "@/lib/features/weather";
import { fetchWeather } from "@/lib/features/weather/actions";
import MoodJournalForm from "@/components/ui/journal-form";
import { AppDispatch, RootState } from "@/lib/store";
import {
  CalendarIcon,
  PencilIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import EntryList from "@/components/ui/entry-list";

import { JournalEntry } from "@/types/pokemon";
import { deleteEntry } from "@/lib/features/journal";
import CalendarView from "@/components/ui/calender-view";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { entries } = useSelector((state: RootState) => state.jorunal);

  const [activeTab, setActiveTab] = useState<"new" | "list" | "calendar">(
    "new"
  );
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    const getLocationAndWeather = async () => {
      if (navigator.geolocation) {
        try {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const coords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };
              dispatch(setCoordinates(coords));
              dispatch(fetchWeather(coords));
            },
            (error) => {
              console.error("Geolocation error:", error.message);
              alert(
                "Unable to get your location. Some features may be limited."
              );
            },
            { timeout: 10000 } // 10 second timeout
          );
        } catch (error) {
          console.error("Error getting geolocation:", error);
        }
      } else {
        alert(
          "Geolocation is not supported by your browser. Some features may be limited."
        );
      }
    };

    getLocationAndWeather();
  }, [dispatch]);

  const handleEntrySelect = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setActiveTab("list");
  };

  const handleDeleteEntry = (entryId: string) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      dispatch(deleteEntry(entryId));
      if (selectedEntry && selectedEntry.id === entryId) {
        setSelectedEntry(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 animate-fade-in">
      <header className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-none py-4">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            Mood Journal
          </h1>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 animate-slide-up">
        <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("new")}
            className={`px-4 py-2 font-medium flex items-center ${
              activeTab === "new"
                ? "border-b-2 border-indigo-500 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            <PencilIcon className="h-5 w-5 mr-1" />
            New Entry
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`px-4 py-2 font-medium flex items-center ${
              activeTab === "list"
                ? "border-b-2 border-indigo-500 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            <ListBulletIcon className="h-5 w-5 mr-1" />
            Journal Entries {entries.length > 0 && `(${entries.length})`}
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-4 py-2 font-medium flex items-center ${
              activeTab === "calendar"
                ? "border-b-2 border-indigo-500 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            <CalendarIcon className="h-5 w-5 mr-1" />
            Calendar View
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "new" && <MoodJournalForm />}

        {activeTab === "list" && (
          <EntryList
            entries={entries}
            onDeleteEntry={handleDeleteEntry}
            selectedEntry={selectedEntry}
          />
        )}

        {activeTab === "calendar" && (
          <CalendarView entries={entries} onEntrySelect={handleEntrySelect} />
        )}
      </main>
    </div>
  );
}
