"use client";

import React from "react";
import {
  DocumentArrowDownIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { JournalEntry } from "@/types/pokemon";
import {
  exportAllEntriesToCSV,
  exportAllEntriesToPDF,
} from "@/utils/export-entries";

interface ExportButtonProps {
  entries: JournalEntry[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ entries }) => {
  const handleExportPDF = () => {
    if (entries.length === 0) {
      alert("No entries to export");
      return;
    }
    exportAllEntriesToPDF(entries);
  };

  const handleExportCSV = () => {
    if (entries.length === 0) {
      alert("No entries to export");
      return;
    }
    exportAllEntriesToCSV(entries);
  };

  if (entries.length === 0) return null;

  return (
    <div className="flex space-x-2">

      <button
        onClick={handleExportPDF}
        className="
          flex items-center md:space-x-2 
          bg-blue-500 text-white 
         md:px-4 md:py-2 rounded-md  p-1
          hover:bg-blue-600 
          transition-colors 
          dark:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer
        "
        title="Export Entries to PDF"
      >
        <DocumentArrowDownIcon className="h-5 w-5" />
        <span className="hidden md:block">PDF</span>
      </button>

  
      <button
        onClick={handleExportCSV}
        className="
          flex items-center md:space-x-2 
          bg-green-500 text-white 
          md:px-4 md:py-2 rounded-md  p-1
          hover:bg-green-600 
          transition-colors 
          dark:bg-green-600 dark:hover:bg-green-700 cursor-pointer
        "
        title="Export Entries to CSV"
      >
        <TableCellsIcon className="h-5 w-5" />
        <span className="hidden md:block">CSV</span>
      </button>
    </div>
  );
};

export default ExportButton;
