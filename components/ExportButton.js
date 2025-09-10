import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, FileJson } from 'lucide-react';
import { exportToPDF, exportToCSV, exportToJSON } from '../utils/exportUtils';

export default function ExportButton({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = (format) => {
    switch(format) {
      case 'pdf':
        exportToPDF(data, 'analysis-content');
        break;
      case 'csv':
        exportToCSV(data);
        break;
      case 'json':
        exportToJSON(data);
        break;
      default:
        break;
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-bcg-blue text-white px-6 py-3 rounded-md hover:bg-bcg-light-blue transition-colors flex items-center gap-2 shadow-lg"
      >
        <Download size={20} />
        Export Analysis
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
          <div className="py-2">
            <button
              onClick={() => handleExport('pdf')}
              className="w-full px-4 py-2 text-left hover:bg-bcg-gray flex items-center gap-3 transition-colors"
            >
              <FileText size={18} className="text-bcg-red" />
              <div>
                <div className="font-medium text-bcg-dark-gray">Export as PDF</div>
                <div className="text-xs text-gray-500">Executive summary format</div>
              </div>
            </button>
            
            <button
              onClick={() => handleExport('csv')}
              className="w-full px-4 py-2 text-left hover:bg-bcg-gray flex items-center gap-3 transition-colors"
            >
              <FileSpreadsheet size={18} className="text-bcg-green" />
              <div>
                <div className="font-medium text-bcg-dark-gray">Export as CSV</div>
                <div className="text-xs text-gray-500">Spreadsheet format</div>
              </div>
            </button>
            
            <button
              onClick={() => handleExport('json')}
              className="w-full px-4 py-2 text-left hover:bg-bcg-gray flex items-center gap-3 transition-colors"
            >
              <FileJson size={18} className="text-bcg-orange" />
              <div>
                <div className="font-medium text-bcg-dark-gray">Export as JSON</div>
                <div className="text-xs text-gray-500">Raw data format</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}