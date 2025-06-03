export interface ScanResultType {
  threatLevel: 'safe' | 'suspicious' | 'dangerous';
  threats: Array<{
    name: string;
    description: string;
  }>;
  details: {
    lastScanned: string;
    domainAge: string;
    ipLocation: string;
  };
}

export interface URLHistoryItem {
  id: string;
  url: string;
  timestamp: string;
  threatLevel: 'safe' | 'suspicious' | 'dangerous';
}