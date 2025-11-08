import { Link } from '@tanstack/react-router';
import type { RequestData } from '@/types/request-data';

type Props = { request: RequestData };

export function RequestRow({ request }: Props) {
  const getMethodColor = (method: string) => {
    const colors: Record<string, string> = {
      GET: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      POST: 'bg-green-500/10 text-green-400 border-green-500/20',
      PUT: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      DELETE: 'bg-red-500/10 text-red-400 border-red-500/20',
      PATCH: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    };
    return colors[method] || 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-400';
    if (status >= 300 && status < 400) return 'text-blue-400';
    if (status >= 400 && status < 500) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <Link
      key={request.id}
      to="/requests/$requestId"
      params={{ requestId: request.id }}
    >
      <div className="mb-4 bg-[#1e2230] border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span
              className={`px-2.5 py-1 text-xs font-medium rounded border ${getMethodColor(
                request.method,
              )}`}
            >
              {request.method}
            </span>
            <span className="text-sm font-mono text-gray-300">
              {request.endpoint}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className={getStatusColor(request.status)}>
              {request.status}
            </span>
            <span>{request.responseTime}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">Response Preview</div>
            <div className="font-mono text-xs text-gray-400 bg-[#151820] px-3 py-2 rounded border border-gray-800 overflow-hidden">
              <div className="truncate whitespace-pre-wrap">
                {request.preview}
              </div>
            </div>
          </div>
          <div className="ml-4 text-xs text-gray-600">{request.timestamp}</div>
        </div>
      </div>
    </Link>
  );
}
