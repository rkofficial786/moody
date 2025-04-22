import React from 'react';
import { FaceSmileIcon } from '@heroicons/react/24/outline';
import { Mood } from '@/types/pokemon';

interface MoodFilterProps {
  uniqueMoods: Mood[];
  filterMood: number | null;
  onFilterChange: (moodId: number | null) => void;
}

const MoodFilter: React.FC<MoodFilterProps> = ({ 
  uniqueMoods, 
  filterMood, 
  onFilterChange 
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={() => onFilterChange(null)}
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
          onClick={() => onFilterChange(mood.id)}
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
  );
};

export default MoodFilter;