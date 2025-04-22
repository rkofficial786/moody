import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { JournalEntry } from '@/types/pokemon';
import { formatDate } from '@/helpers/helper';

interface EntryCardProps {
  entry: JournalEntry;
  onView: () => void;
  onDelete: () => void;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry, onView, onDelete }) => {
  return (
    <div 
      className={`border border-gray-200 dark:border-gray-700 rounded-lg p-4 ${entry.mood.color} bg-opacity-10 dark:bg-opacity-20 cursor-pointer hover:bg-opacity-20 dark:hover:bg-opacity-30 transition-colors`}
      onClick={onView}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {formatDate(entry.date)}
          </h3>
          <div className="flex items-center my-2">
            <span className="text-2xl mr-2">{entry.mood.emoji}</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {entry.mood.name}
            </span>
          </div>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          aria-label="Delete entry"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
      
      {entry.notes && (
        <div className="mt-2 bg-gray-100 dark:bg-gray-700 bg-opacity-70 p-3 rounded">
          <p className="text-gray-800 dark:text-gray-200 line-clamp-2">
            {entry.notes}
          </p>
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
  );
};

export default EntryCard;