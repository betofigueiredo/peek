import { useRequestStore } from "@/store";
import { getStatusColor } from "@/utils/get-status-color";

export function Graph() {
  const requestsIDs = useRequestStore((state) => state.requestsIDs);
  const requests = useRequestStore((state) => state.requests);
  const highest = Math.max(
    ...Object.values(requests).map((r) => r.responseTime),
  );

  function getHeight(value: number) {
    return (value / highest) * 100;
  }

  return (
    <div className="flex items-end w-full h-48 text-left mt-8 px-2 gap-1">
      {requestsIDs.map((requestID) => (
        <div
          key={requestID}
          className={`w-5 ${getStatusColor(requests[requestID].status)}`}
          style={{
            height: `${getHeight(requests[requestID].responseTime)}%`,
          }}
        />
      ))}
    </div>
  );
}
