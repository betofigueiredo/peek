import { createFileRoute } from "@tanstack/react-router";
import { data } from "@/data/smallExample";

export const Route = createFileRoute("/requests/$requestId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { requestId } = Route.useParams();
  const request = data.find((r) => r.id === requestId);

  if (!request) {
    return (
      <main className="px-6 py-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-white mb-1">{requestId}</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 py-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-white mb-1">{requestId}</h2>
      </div>

      <div className="space-y-3">
        {" "}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">Response Preview</div>
            <div className="font-mono text-xs text-gray-400 bg-[#151820] px-3 py-2 rounded border border-gray-800 overflow-hidden">
              <div className="truncate whitespace-pre-wrap">
                {JSON.stringify(request.response, null, 2)}
              </div>
            </div>
          </div>
          <div className="ml-4 text-xs text-gray-600">{request.timestamp}</div>
        </div>
      </div>
    </main>
  );
}
