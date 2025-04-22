"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { JournalEntry, Mood } from "@/types/pokemon";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import EntryDetailsModal from "./modal";

import MoodFilter from "./filter";
import EntryCard from "./card";
import ExportButton from "./export";

interface EntryListProps {
  entries: JournalEntry[];
  onDeleteEntry: (entryId: string) => void;
  selectedEntry?: JournalEntry | null;
}

const EntryList: React.FC<EntryListProps> = ({
  entries,
  onDeleteEntry,
  selectedEntry = null,
}) => {
  const dispatch = useDispatch();
  const [filterMood, setFilterMood] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [viewingEntry, setViewingEntry] = useState<JournalEntry | null>(null);

  console.log(entries, "enteries");

  useEffect(() => {
    if (selectedEntry) {
      setViewingEntry(selectedEntry);
    }
  }, [selectedEntry]);

  const uniqueMoods = Array.from(
    new Set(entries.map((entry) => entry.mood.id))
  ).map((id) => entries.find((entry) => entry.mood.id === id)?.mood) as Mood[];

  const filteredEntries = filterMood
    ? entries.filter((entry) => entry.mood.id === filterMood)
    : entries;

  const sortedEntries = [...filteredEntries].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortBy === "newest" ? dateB - dateA : dateA - dateB;
  });

  if (viewingEntry) {
    return (
      <EntryDetailsModal
        entry={viewingEntry}
        onClose={() => setViewingEntry(null)}
        onDelete={() => {
          onDeleteEntry(viewingEntry.id);
          setViewingEntry(null);
        }}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-gray-800 dark:text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
          Your Journal Entries
        </h2>

        <ExportButton entries={sortedEntries} />
      </div>

      {uniqueMoods.length > 0 && (
        <MoodFilter
          uniqueMoods={uniqueMoods}
          filterMood={filterMood}
          onFilterChange={setFilterMood}
        />
      )}

      {sortedEntries.length > 0 ? (
        <div className="space-y-4">
          {sortedEntries.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onView={() => setViewingEntry(entry)}
              onDelete={() => onDeleteEntry(entry.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400">
          <ChartBarIcon className="h-16 w-16 mx-auto mb-3 text-gray-500 dark:text-gray-600" />
          {filterMood ? (
            <p className="text-gray-600 dark:text-gray-400">
              No entries with this mood filter.
            </p>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No journal entries yet. Start tracking your mood!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default EntryList;
