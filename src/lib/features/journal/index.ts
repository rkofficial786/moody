// src/store/slices/journal-slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JournalEntry, JournalState, Mood, WeatherData } from "@/types/pokemon";

const initialState: JournalState = {
  entries: [],
  isLoading: false,
  error: null
};

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<{ mood: Mood; notes: string; weather: WeatherData }>) => {
      const { mood, notes, weather } = action.payload;
      
      const newEntry: JournalEntry = {
        id: new Date().toString(),
        date: new Date().toISOString(),
        mood: mood,
        notes: notes,
        weather: weather
      };
      
      // Check if entry for this date already exists
      const existingEntryIndex = state.entries.findIndex(
        entry => entry.date.split('T')[0] === newEntry.date.split('T')[0]
      );
      
      if (existingEntryIndex >= 0) {
        // Update existing entry
        state.entries[existingEntryIndex] = newEntry;
      } else {
        // Add new entry
        state.entries.push(newEntry);
      }
    },
    deleteEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
    },
    clearEntries: (state) => {
      state.entries = [];
    }
  }
});

export const { addEntry, deleteEntry, clearEntries } = journalSlice.actions;
export default journalSlice.reducer;