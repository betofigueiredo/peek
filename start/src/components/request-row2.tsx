import { Link } from '@tanstack/react-router';
import type { RequestData } from '@/types/request-data';
import { getStatusColor } from '@/utils/get-status-color';

type Props = { request: RequestData };

export function RequestRow2({ request }: Props) {
  return (
    <Link to="/requests/$requestId" params={{ requestId: request.id }}>
      <div className="flex w-full h-16 items-center font-mono text-left hover:bg-[#3F435A] hover:cursor-pointer transition-colors duration-150 px-3 border-b border-(--panel-border)">
        <div
          className={`w-16 py-1.5 ${getStatusColor(request.status)} border border-gray-900 text-black text-center shrink-0`}
        >
          200
        </div>
        <div className="pl-4 pr-2 text-gray-600 shrink-0">|</div>
        <div className="text-[#ABAEC4] text-sm text-center w-40 shrink-0">
          {new Date(request.timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          })}
        </div>
        <div className="px-3 text-gray-600 shrink-0">|</div>
        <div className="font-medium text-[#ABAEC4] shrink-0 w-10 text-center">
          {request.method}
        </div>
        <div className="pl-3 pr-4 text-gray-600 shrink-0">|</div>
        <div className="font-medium flex-1 min-w-0">{request.endpoint}</div>
      </div>
    </Link>
  );
}
