import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, ExternalLink, Info } from 'lucide-react';
import { ScanResultType } from '../types';

interface ScanResultProps {
  result: ScanResultType;
  url: string;
}

const ScanResult: React.FC<ScanResultProps> = ({ result, url }) => {
  const { threatLevel, threats, details } = result;
  
  const renderThreatLevelBadge = () => {
    switch (threatLevel) {
      case 'safe':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
            <CheckCircle className="w-4 h-4 mr-1" />
            Safe
          </div>
        );
      case 'suspicious':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Suspicious
          </div>
        );
      case 'dangerous':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
            <XCircle className="w-4 h-4 mr-1" />
            Dangerous
          </div>
        );
      default:
        return null;
    }
  };
  
  const formatURL = (url: string): string => {
    try {
      // Try to parse the URL to display it nicely
      const parsedUrl = new URL(url);
      return parsedUrl.hostname + parsedUrl.pathname;
    } catch (e) {
      // If not a valid URL, just return it as is
      return url;
    }
  };
  
  return (
    <div>
      <div className="mb-4 p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between mb-2">
          <h4 className="text-base font-medium text-gray-900 dark:text-white truncate max-w-full sm:max-w-xs md:max-w-md">
            {formatURL(url)}
          </h4>
          {renderThreatLevelBadge()}
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Last scanned: {new Date(details.lastScanned).toLocaleString()}
        </div>
      </div>
      
      {threatLevel !== 'safe' && threats.length > 0 && (
        <div className="mb-4">
          <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
            Threats Detected ({threats.length})
          </h4>
          <div className="space-y-3">
            {threats.map((threat, index) => (
              <div key={index} className={`p-3 rounded-lg ${
                threatLevel === 'dangerous' 
                  ? 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-700' 
                  : 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-700'
              }`}>
                <h5 className={`text-sm font-medium mb-1 ${
                  threatLevel === 'dangerous' 
                    ? 'text-red-800 dark:text-red-200' 
                    : 'text-yellow-800 dark:text-yellow-200'
                }`}>
                  {threat.name}
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {threat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {threatLevel === 'safe' && (
        <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500 dark:border-green-700">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" />
            <div>
              <h5 className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                No threats detected
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                This URL appears to be safe. However, always remain cautious when sharing personal information online.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div>
        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
          Additional Information
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <span className="font-medium text-gray-700 dark:text-gray-300">Domain Age:</span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">{details.domainAge}</span>
          </div>
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <span className="font-medium text-gray-700 dark:text-gray-300">IP Location:</span>
            <span className="ml-2 text-gray-600 dark:text-gray-400">{details.ipLocation}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
          <Info className="w-4 h-4 mr-1" />
          <p>
            Note: This is a demonstration. In a production environment, this would connect to real security services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScanResult;