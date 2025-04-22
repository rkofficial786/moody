import React from "react";
import { TrashIcon, XMarkIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { JournalEntry } from "@/types/pokemon";
import { formatDate } from "@/helpers/helper";

interface EntryDetailsModalProps {
  entry: JournalEntry;
  onClose: () => void;
  onDelete: () => void;
}

const EntryDetailsModal: React.FC<EntryDetailsModalProps> = ({
  entry,
  onClose,
  onDelete,
}) => {
  const handlePrintEntry = () => {
    const printWindow = window.open("", "PRINT", "height=800,width=600");

    if (!printWindow) {
      alert("Please allow popups to print the entry.");
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Mood Journal Entry</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px; 
              line-height: 1.6; 
            }
            .entry-header { 
              border-bottom: 2px solid #eee; 
              padding-bottom: 10px; 
              margin-bottom: 20px; 
            }
            .entry-section { 
              margin-bottom: 20px; 
            }
            .entry-section h3 { 
              color: #333; 
              border-bottom: 1px solid #ddd; 
              padding-bottom: 5px; 
            }
          </style>
        </head>
        <body>
          <div class="entry-header">
            <h1>Mood Journal Entry</h1>
            <p><strong>Date:</strong> ${formatDate(entry.date)}</p>
          </div>
          
          <div class="entry-section">
            <h3>Mood</h3>
            <p>
              <strong>Mood:</strong> ${entry.mood.name} ${entry.mood.emoji}
            </p>
          </div>
          
          ${
            entry.notes
              ? `
            <div class="entry-section">
              <h3>Notes</h3>
              <p>${entry.notes}</p>
            </div>
          `
              : ""
          }
          
          <div class="entry-section">
            <h3>Weather</h3>
            <ul>
              <li><strong>Location:</strong> ${entry.weather.location}</li>
              <li><strong>Temperature:</strong> ${Math.round(
                entry.weather.temperature
              )}°C</li>
              <li><strong>Conditions:</strong> ${entry.weather.description}</li>
              <li><strong>Humidity:</strong> ${entry.weather.humidity}%</li>
              <li><strong>Wind Speed:</strong> ${
                entry.weather.windSpeed
              } m/s</li>
            </ul>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Entry Details
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrintEntry}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              title="Print Entry"
            >
              <PrinterIcon className="h-5 w-5" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              title="Close"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div
            className={`border border-gray-200 dark:border-gray-700 rounded-lg p-5 ${entry.mood.color} bg-opacity-20 dark:bg-opacity-30 mb-6`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {formatDate(entry.date)}
                </h3>
                <div className="flex items-center my-3">
                  <span className="text-4xl mr-3">{entry.mood.emoji}</span>
                  <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
                    {entry.mood.name}
                  </span>
                </div>
              </div>

              <button
                onClick={onDelete}
                className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                aria-label="Delete entry"
                title="Delete Entry"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {entry.notes && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                Notes:
              </h4>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
                  {entry.notes}
                </p>
              </div>
            </div>
          )}

          {/* Weather Section */}
          <div>
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Weather Details:
            </h4>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Location
                </p>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {entry.weather.location}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Temperature
                </p>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {Math.round(entry.weather.temperature)}°C
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Conditions
                </p>
                <p className="font-medium text-gray-800 dark:text-gray-200 capitalize">
                  {entry.weather.description}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Humidity
                </p>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {entry.weather.humidity}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Wind Speed
                </p>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {entry.weather.windSpeed} m/s
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full py-2 bg-gray-200 dark:bg-gray-700 
              hover:bg-gray-300 dark:hover:bg-gray-600 
              rounded-md text-gray-800 dark:text-white 
              transition-colors"
          >
            Close Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryDetailsModal;
