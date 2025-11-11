import type { RequestData } from '@/types/request-data';
import { getStatusColor } from '@/utils/get-status-color';

type Props = { requests: Array<RequestData> };

export function Graph({ requests }: Props) {
  const highest = Math.max(...requests.map((r) => r.responseTime));

  function getHeight(value: number) {
    return (value / highest) * 100;
  }

  return (
    <div className="flex items-end w-full h-48 text-left mt-8 px-2 gap-1">
      {requests.map((request) => (
        <div
          key={request.id}
          className={`w-5 ${getStatusColor(request.status)}`}
          style={{ height: `${getHeight(request.responseTime)}%` }}
        />
      ))}
    </div>
  );
}
