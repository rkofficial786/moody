"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { JournalEntry, Mood } from '@/types/pokemon';
import { deleteEntry } from '@/lib/features/journal';
import { TrashIcon, FaceSmileIcon, CalendarIcon, ChartBarIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@/helpers/helper';

interface EntryListProps {
  entries: JournalEntry[];
  onDeleteEntry: (entryId: string) => void;
  selectedEntry?: JournalEntry | null;
}

const EntryList: React.FC<EntryListProps> = ({ entries, onDeleteEntry, selectedEntry = null }) => {
  const dispatch = useDispatch();
  const [filterMood, setFilterMood] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [viewingEntry, setViewingEntry] = useState<JournalEntry | null>(null);
  
  // Set the viewing entry when the selectedEntry prop changes
  useEffect(() => {
    if (selectedEntry) {
      setViewingEntry(selectedEntry);
    }
  }, [selectedEntry]);
  
  // Get all unique moods from entries
  const uniqueMoods = Array.from(
    new Set(entries.map((entry) => entry.mood.id))
  ).map((id) => entries.find((entry) => entry.mood.id === id)?.mood) as Mood[];
  
  // Filter entries by mood if filter is active
  const filteredEntries = filterMood
    ? entries.filter((entry) => entry.mood.id === filterMood)
    : entries;
  
  // Sort entries by date
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
  });
  
  // Format date
 
  
  // If viewing a specific entry, show its details
  if (viewingEntry) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-gray-800 dark:text-white">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">Entry Details</h2>
          <button 
            onClick={() => setViewingEntry(null)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        
        <div className={`border border-gray-200 dark:border-gray-700 rounded-lg p-5 ${viewingEntry.mood.color} bg-opacity-20 dark:bg-opacity-30`}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{formatDate(viewingEntry.date)}</h3>
              <div className="flex items-center my-3">
                <span className="text-4xl mr-3">{viewingEntry.mood.emoji}</span>
                <span className="text-lg font-medium text-gray-700 dark:text-gray-200">{viewingEntry.mood.name}</span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                onDeleteEntry(viewingEntry.id);
                setViewingEntry(null);
              }}
              className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              aria-label="Delete entry"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
          
          {viewingEntry.notes && (
            <div className="mt-4 bg-gray-100 dark:bg-gray-700 bg-opacity-70 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Notes:</h4>
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{viewingEntry.notes}</p>
            </div>
          )}
          
          <div className="mt-5 bg-gray-100 dark:bg-gray-700 bg-opacity-70 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Weather:</h4>
            <div className="flex flex-wrap justify-between text-gray-700 dark:text-gray-200">
              <div className="mb-2">
                <span className="font-medium">Location:</span>
                <span className="ml-2">{viewingEntry.weather.location}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Temperature:</span>
                <span className="ml-2">{Math.round(viewingEntry.weather.temperature)}°C</span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Conditions:</span>
                <span className="ml-2 capitalize">{viewingEntry.weather.description}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Humidity:</span>
                <span className="ml-2">{viewingEntry.weather.humidity}%</span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Wind Speed:</span>
                <span className="ml-2">{viewingEntry.weather.windSpeed} m/s</span>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setViewingEntry(null)}
          className="mt-4 w-full py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md text-gray-800 dark:text-white transition-colors"
        >
          Back to All Entries
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-gray-800 dark:text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">Your Journal Entries</h2>
        <div className="flex space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
            className="text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-gray-800 dark:text-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
      
      {/* Mood filters */}
      {uniqueMoods.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setFilterMood(null)}
            className={`text-sm px-3 py-1 rounded-full flex items-center ${
              filterMood === null 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <FaceSmileIcon className="h-4 w-4 mr-1" />
            All Moods
          </button>
          
          {uniqueMoods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setFilterMood(mood.id)}
              className={`text-sm px-3 py-1 rounded-full flex items-center ${
                filterMood === mood.id 
                  ? `${mood.color} text-white font-medium` 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="mr-1">{mood.emoji}</span>
              {mood.name}
            </button>
          ))}
        </div>
      )}
      
      {/* Journal entries */}
      {sortedEntries.length > 0 ? (
        <div className="space-y-4">
          {sortedEntries.map((entry) => (
            <div 
              key={entry.id} 
              className={`border border-gray-200 dark:border-gray-700 rounded-lg p-4 ${entry.mood.color} bg-opacity-10 dark:bg-opacity-20 cursor-pointer hover:bg-opacity-20 dark:hover:bg-opacity-30 transition-colors`}
              onClick={() => setViewingEntry(entry)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{formatDate(entry.date)}</h3>
                  <div className="flex items-center my-2">
                    <span className="text-2xl mr-2">{entry.mood.emoji}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{entry.mood.name}</span>
                  </div>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent onClick
                    onDeleteEntry(entry.id);
                  }}
                  className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  aria-label="Delete entry"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
              
              {entry.notes && (
                <div className="mt-2 bg-gray-100 dark:bg-gray-700 bg-opacity-70 p-3 rounded">
                  <p className="text-gray-800 dark:text-gray-200 line-clamp-2">{entry.notes}</p>
                </div>
              )}
              
              <div className="mt-3 text-xs text-gray-600 dark:text-gray-300 flex items-center justify-between bg-gray-100 dark:bg-gray-700 bg-opacity-70 p-2 rounded">
                <div>
                  <span className="font-medium">{entry.weather.location}</span>
                  <span className="ml-1 capitalize">({entry.weather.description})</span>
                </div>
                <div>
                  <span>{Math.round(entry.weather.temperature)}°C</span>
                  <span className="ml-2">Humidity: {entry.weather.humidity}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400">
          <ChartBarIcon className="h-16 w-16 mx-auto mb-3 text-gray-500 dark:text-gray-600" />
          {filterMood ? (
            <p className="text-gray-600 dark:text-gray-400">No entries with this mood filter.</p>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No journal entries yet. Start tracking your mood!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EntryList;