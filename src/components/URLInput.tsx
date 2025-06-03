import React from 'react';
import { Search } from 'lucide-react';

interface URLInputProps {
  url: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isScanning: boolean;
}

const URLInput: React.FC<URLInputProps> = ({ url, onChange, onSubmit, isScanning }) => {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row">
        <div className="relative flex-grow mb-3 sm:mb-0 sm:mr-3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter URL to check (e.g., https://example.com)"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     placeholder-gray-500 dark:placeholder-gray-400
                     transition-colors duration-200"
            disabled={isScanning}
          />
        </div>
        <button
          type="submit"
          disabled={!url || isScanning}
          className={`py-3 px-6 rounded-lg font-medium transition-all duration-200
                    ${!url || isScanning
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow'
                    }`}
        >
          {isScanning ? 'Scanning...' : 'Check URL'}
        </button>
      </div>
    </form>
  );
};

export default URLInput;