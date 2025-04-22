"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import { JournalEntry } from "@/types/pokemon";
import { CalendarIcon } from "@heroicons/react/24/outline";
import "react-calendar/dist/Calendar.css";

interface CalendarViewProps {
  entries: JournalEntry[];
  onEntrySelect: (entry: JournalEntry) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  entries,
  onEntrySelect,
}) => {
  const [date, setDate] = useState(new Date());

  const getEntryForDate = (date: Date): JournalEntry | undefined => {
    const targetYear = date.getFullYear();
    const targetMonth = date.getMonth() + 1;
    const targetDay = date.getDate();
    const targetDateStr = `${targetYear}-${targetMonth
      .toString()
      .padStart(2, "0")}-${targetDay.toString().padStart(2, "0")}`;

    return entries.find((entry) => {
      const entryDate = new Date(entry.date);
      const entryYear = entryDate.getFullYear();
      const entryMonth = entryDate.getMonth() + 1;
      const entryDay = entryDate.getDate();
      const entryDateStr = `${entryYear}-${entryMonth
        .toString()
        .padStart(2, "0")}-${entryDay.toString().padStart(2, "0")}`;

      return entryDateStr === targetDateStr;
    });
  };

  const handleDateChange = (value: any) => {
    setDate(value);
    const entry = getEntryForDate(value);
    if (entry) {
      onEntrySelect(entry);
    }
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return null;

    const entry = getEntryForDate(date);
    if (!entry) return null;

    return (
      <div className="flex flex-col items-center mt-1">
        <span className="text-xl">{entry.mood.emoji}</span>
        <span className="text-xs mt-1 text-gray-700 dark:text-gray-300">
          {Math.round(entry.weather.temperature)}°C
        </span>
      </div>
    );
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return "";

    const entry = getEntryForDate(date);
    if (!entry) return "";
    return `${entry.mood.color} bg-opacity-40`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-gray-800 dark:text-white w-full">
      <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
        Calendar View
      </h2>

      <div className="custom-calendar-container w-full">
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileContent={tileContent}
          tileClassName={tileClassName}
          className="react-calendar w-full"
        />
      </div>

      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 flex items-center">
        <CalendarIcon className="h-4 w-4 mr-1 text-gray-600 dark:text-gray-500" />
        <span>Click on a colored day to view that entry</span>
      </div>

      <style jsx global>{`
        .react-calendar {
          background-color: transparent;
          border-color: transparent;
          border-radius: 0.5rem;
          padding: 1rem;
          font-family: inherit;
          width: 100% !important;
          max-width: 100% !important;
          color: theme("colors.gray.800");
        }

        /* Dark mode styles */
        .dark .react-calendar {
          color: theme("colors.white");
        }

        .react-calendar__viewContainer {
          width: 100%;
        }

        .react-calendar__month-view {
          width: 100%;
        }

        .react-calendar__month-view__days {
          display: grid !important;
          grid-template-columns: repeat(7, 1fr);
          width: 100%;
        }

        .react-calendar__tile {
          padding: 1em 0.5em;
          position: relative;
          height: 80px;
          max-width: none !important;
          flex-basis: 14.2857% !important;
          text-align: center;
          background-color: transparent;
          color: theme("colors.gray.700");
          border-radius: 0.5rem;
        }

        .dark .react-calendar__tile {
          color: white;
        }

        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background-color: theme("colors.gray.100");
        }

        .dark .react-calendar__tile:enabled:hover,
        .dark .react-calendar__tile:enabled:focus {
          background-color: theme("colors.gray.700");
        }

        .react-calendar__tile--now {
          background-color: theme("colors.indigo.100");
          color: theme("colors.indigo.700");
          border-radius: 0.3rem;
        }

        .dark .react-calendar__tile--now {
          background-color: theme("colors.indigo.900");
          color: theme("colors.indigo.200");
        }

        .react-calendar__tile--active {
          background-color: theme("colors.indigo.500");
          color: white;
          border-radius: 0.3rem;
        }

        .react-calendar__tile--active:enabled:hover,
        .react-calendar__tile--active:enabled:focus {
          background-color: theme("colors.indigo.600");
        }

        .react-calendar__navigation {
          display: flex;
          width: 100%;
          margin-bottom: 1rem;
        }

        .react-calendar__navigation button {
          color: theme("colors.gray.700");
          background: none;
          font-size: 16px;
          margin-top: 8px;
          min-width: 44px;
          flex-grow: 1;
        }

        .dark .react-calendar__navigation button {
          color: white;
        }

        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background-color: theme("colors.gray.100");
          border-radius: 0.3rem;
        }

        .dark .react-calendar__navigation button:enabled:hover,
        .dark .react-calendar__navigation button:enabled:focus {
          background-color: theme("colors.gray.700");
        }

        .react-calendar__month-view__weekdays {
          color: theme("colors.indigo.600");
          font-weight: bold;
          text-transform: uppercase;
          font-size: 0.75em;
          width: 100%;
        }

        .dark .react-calendar__month-view__weekdays {
          color: theme("colors.indigo.400");
        }

        .react-calendar__month-view__weekdays__weekday {
          flex: 1;
          text-align: center;
          padding: 0.5em;
        }

        .react-calendar__month-view__days__day--weekend {
          color: theme("colors.pink.500");
        }

        .dark .react-calendar__month-view__days__day--weekend {
          color: theme("colors.pink.400");
        }

        .react-calendar__month-view__days__day--neighboringMonth {
          color: theme("colors.gray.400");
        }

        .dark .react-calendar__month-view__days__day--neighboringMonth {
          color: theme("colors.gray.600");
        }

        .custom-calendar-container {
          max-width: 100%;
          overflow: auto;
        }
      `}</style>
    </div>
  );
};

export default CalendarView;
