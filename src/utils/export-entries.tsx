// src/utils/export-entries-pdf.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { JournalEntry } from "@/types/pokemon";

export const exportAllEntriesToPDF = (entries: JournalEntry[]) => {
  // Create a new jsPDF instance
  const doc = new jsPDF("landscape");

  // Set document title
  doc.setFontSize(18);
  doc.text("Mood Journal Entries", 14, 22);

  // Prepare table data
  const tableData = entries.map((entry) => [
    new Date(entry.date).toLocaleDateString(),
    entry.mood.name,
    entry.mood.emoji,
    entry.notes || "No notes",
    `${entry.weather.temperature}°C`,
    entry.weather.description,
    entry.weather.location,
  ]);

  // Define columns
  const columns = [
    "Date",
    "Mood",
    "Emoji",
    "Notes",
    "Temperature",
    "Weather",
    "Location",
  ];

  // Add the table
  autoTable(doc, {
    head: [columns],
    body: tableData,
    startY: 30,
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [41, 128, 185], // Blue header
      textColor: 255, // White text
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240], // Light gray for alternating rows
    },
    theme: "striped",
  });

  // @ts-ignore
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width - 30,
      doc.internal.pageSize.height - 10
    );
  }

  // Generate file name with current date
  const fileName = `mood-journal-entries-${
    new Date().toISOString().split("T")[0]
  }.pdf`;

  // Save the PDF
  doc.save(fileName);
};

// Optional: Export Entries as CSV for more flexibility
export const exportAllEntriesToCSV = (entries: JournalEntry[]) => {
  // Convert entries to CSV
  const headers = [
    "Date",
    "Mood Name",
    "Mood Emoji",
    "Notes",
    "Temperature",
    "Weather Description",
    "Location",
  ];

  const csvData = entries.map((entry) => [
    new Date(entry.date).toLocaleDateString(),
    entry.mood.name,
    entry.mood.emoji,
    entry.notes || "No notes",
    `${entry.weather.temperature}°C`,
    entry.weather.description,
    entry.weather.location,
  ]);

  // Create CSV content
  const csvContent = [
    headers.join(","),
    ...csvData.map((row) =>
      row.map((cell) => `"${cell.toString().replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n");

  // Create and download CSV file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const fileName = `mood-journal-entries-${
    new Date().toISOString().split("T")[0]
  }.csv`;
  // @ts-ignore
  if (navigator.msSaveBlob) {
    // For IE 10+
    // @ts-ignore
    navigator.msSaveBlob(blob, fileName);
  } else {
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
