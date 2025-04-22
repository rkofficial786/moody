// src/components/ui/mood-selector.tsx
"use client";

import React from 'react';
import { Mood } from '@/types/pokemon';

// Define available moods with more vibrant colors
export const moods: Mood[] = [
  { id: 1, name: 'Happy', emoji: '😊', color: 'bg-yellow-500 dark:bg-yellow-400' },
  { id: 2, name: 'Excited', emoji: '🤩', color: 'bg-red-600 dark:bg-red-500' },
  { id: 3, name: 'Calm', emoji: '😌', color: 'bg-blue-500 dark:bg-blue-400' },
  { id: 4, name: 'Sad', emoji: '😔', color: 'bg-gray-600 dark:bg-gray-500' },
  { id: 5, name: 'Angry', emoji: '😡', color: 'bg-red-800 dark:bg-red-700' },
];

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onMoodSelect: (mood: Mood) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onMoodSelect }) => {
  return (
    <div className="w-full mb-6">
      <h2 className="text-xl font-semibold mb-3 text-foreground">How are you feeling today?</h2>
      <div className="grid grid-cols-5 gap-2 md:gap-4">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodSelect(mood)}
            style={{
              backgroundColor: `var(--mood-${mood.name.toLowerCase()}-bg)`,
              color: `var(--mood-${mood.name.toLowerCase()}-fg)`
            }}
            className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md hover:shadow-lg transition-all ${
              selectedMood?.id === mood.id
                ? 'ring-2 ring-offset-2 ring-primary scale-105'
                : 'hover:scale-105 opacity-90 hover:opacity-100'
            }`}
            type="button"
          >
            <span className="text-4xl mb-2">{mood.emoji}</span>
            <span className="text-sm font-medium">{mood.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;