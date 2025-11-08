export type RequestData = {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  status: number;
  timestamp: string;
  responseTime: string;
  response?: unknown;
  preview: string;
};
