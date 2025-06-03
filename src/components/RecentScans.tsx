import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';
import { URLHistoryItem } from '../types';

interface RecentScansProps {
  history: URLHistoryItem[];
  onItemClick: (item: URLHistoryItem) => void;
}

const RecentScans: React.FC<RecentScansProps> = ({ history, onItemClick }) => {
  const formatURL = (url: string): string => {
    try {
      // Try to parse the URL to display it nicely
      const parsedUrl = new URL(url);
      return parsedUrl.hostname + (parsedUrl.pathname !== '/' ? parsedUrl.pathname : '');
    } catch (e) {
      // If not a valid URL, just return it as is
      return url;
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const renderThreatIcon = (threatLevel: 'safe' | 'suspicious' | 'dangerous') => {
    switch (threatLevel) {
      case 'safe':
        return <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />;
      case 'suspicious':
        return <AlertTriangle className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />;
      case 'dangerous':
        return <XCircle className="w-4 h-4 text-red-500 dark:text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-700">
      {history.map((item) => (
        <div 
          key={item.id}
          className="py-3 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer transition-colors duration-150 rounded-md"
          onClick={() => onItemClick(item)}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {renderThreatIcon(item.threatLevel)}
              <div className="truncate max-w-xs">
                <div className="font-medium text-gray-900 dark:text-white truncate">
                  {formatURL(item.url)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(item.timestamp)}
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentScans;