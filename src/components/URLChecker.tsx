import React, { useState, useEffect } from 'react';
import { Search, Clock, Copy, CheckCircle, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';
import URLInput from './URLInput';
import ScanResult from './ScanResult';
import RecentScans from './RecentScans';
import { ScanResultType, URLHistoryItem } from '../types';

const URLChecker: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<ScanResultType | null>(null);
  const [history, setHistory] = useState<URLHistoryItem[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('urlHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('urlHistory', JSON.stringify(history));
  }, [history]);

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleURLChange = (value: string) => {
    setUrl(value);
    setScanResult(null);
  };

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) return;
    
    setIsScanning(true);
    setScanResult(null);
    
    try {
      // Simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock result
      const mockResult = generateMockResult(url);
      setScanResult(mockResult);
      
      // Add to history
      const newHistoryItem: URLHistoryItem = {
        id: Date.now().toString(),
        url,
        timestamp: new Date().toISOString(),
        threatLevel: mockResult.threatLevel,
      };
      
      setHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]);
    } catch (error) {
      console.error('Error scanning URL:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleHistoryItemClick = (item: URLHistoryItem) => {
    setUrl(item.url);
    handleScan(new Event('submit') as unknown as React.FormEvent);
  };

  const handleCopyResult = () => {
    if (!scanResult) return;
    
    const resultText = `
URL: ${url}
Status: ${getThreatLevelText(scanResult.threatLevel)}
Threats detected: ${scanResult.threats.length}
Details: ${scanResult.threats.map(t => t.name).join(', ')}
Scanned on: ${new Date().toLocaleString()}
    `.trim();
    
    navigator.clipboard.writeText(resultText)
      .then(() => setCopied(true))
      .catch(err => console.error('Failed to copy:', err));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Malicious URL Checker
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Enter a URL below to check if it's safe. Our tool scans for potential phishing attempts,
          malware, and other security threats to help you browse safely.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200 mb-8">
        <div className="p-6">
          <URLInput 
            url={url} 
            onChange={handleURLChange} 
            onSubmit={handleScan} 
            isScanning={isScanning} 
          />
        </div>
        
        {isScanning && (
          <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
              </div>
              <p className="text-gray-600 dark:text-gray-300">Scanning URL for threats...</p>
            </div>
          </div>
        )}
        
        {scanResult && !isScanning && (
          <div className="border-t border-gray-100 dark:border-gray-700">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Scan Results</h3>
                
                <button
                  onClick={handleCopyResult}
                  className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy Results
                    </>
                  )}
                </button>
              </div>
              
              <ScanResult result={scanResult} url={url} />
            </div>
          </div>
        )}
      </div>
      
      {history.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Scans
                </h3>
              </div>
              <button
                onClick={clearHistory}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
              >
                Clear History
              </button>
            </div>
            
            <RecentScans history={history} onItemClick={handleHistoryItemClick} />
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions
const generateMockResult = (url: string): ScanResultType => {
  // This is a mock implementation. In a real app, you would call an actual API.
  const rand = Math.random();
  let threatLevel: 'safe' | 'suspicious' | 'dangerous';
  let threats: Array<{ name: string; description: string }> = [];
  
  if (url.includes('malware') || url.includes('phishing') || rand < 0.2) {
    threatLevel = 'dangerous';
    threats = [
      { 
        name: 'Phishing Attempt', 
        description: 'This URL appears to be impersonating a legitimate website to steal personal information.' 
      },
      { 
        name: 'Malware Distribution', 
        description: 'This website may attempt to install malicious software on your device.' 
      }
    ];
  } else if (url.includes('suspicious') || rand < 0.4) {
    threatLevel = 'suspicious';
    threats = [
      { 
        name: 'Suspicious Behavior', 
        description: 'This website exhibits behavior patterns that are associated with potentially harmful websites.' 
      }
    ];
  } else {
    threatLevel = 'safe';
    threats = [];
  }
  
  return {
    threatLevel,
    threats,
    details: {
      lastScanned: new Date().toISOString(),
      domainAge: Math.floor(Math.random() * 1000) + ' days',
      ipLocation: ['United States', 'Netherlands', 'Germany', 'Unknown'][Math.floor(Math.random() * 4)],
    }
  };
};

const getThreatLevelText = (level: 'safe' | 'suspicious' | 'dangerous'): string => {
  switch (level) {
    case 'safe': return 'Safe';
    case 'suspicious': return 'Suspicious';
    case 'dangerous': return 'Dangerous';
    default: return 'Unknown';
  }
};

export default URLChecker;