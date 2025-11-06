import { createFileRoute, Link } from "@tanstack/react-router";
import { data } from "@/data/smallExample";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  // Sample data for demonstration
  // const requests2 = [
  //   {
  //     id: 1,
  //     method: "GET",
  //     endpoint: "/api/users",
  //     status: 200,
  //     timestamp: "2025-11-03 14:23:45",
  //     responseTime: "234ms",
  //     preview:
  //       '{"users": [{"id": 1, "name": "John Doe"}, {"id": 2, "name": "Jane Smith"}]}',
  //   },
  //   {
  //     id: 2,
  //     method: "POST",
  //     endpoint: "/api/auth/login",
  //     status: 201,
  //     timestamp: "2025-11-03 14:22:18",
  //     responseTime: "156ms",
  //     preview:
  //       '{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", "user": {"id": 5}}',
  //   },
  //   {
  //     id: 3,
  //     method: "DELETE",
  //     endpoint: "/api/posts/42",
  //     status: 204,
  //     timestamp: "2025-11-03 14:20:32",
  //     responseTime: "89ms",
  //     preview: "No content",
  //   },
  //   {
  //     id: 4,
  //     method: "PUT",
  //     endpoint: "/api/settings/profile",
  //     status: 200,
  //     timestamp: "2025-11-03 14:18:05",
  //     responseTime: "312ms",
  //     preview: '{"success": true, "message": "Profile updated successfully"}',
  //   },
  //   {
  //     id: 5,
  //     method: "GET",
  //     endpoint: "/api/dashboard/stats",
  //     status: 500,
  //     timestamp: "2025-11-03 14:15:44",
  //     responseTime: "1203ms",
  //     preview:
  //       '{"error": "Internal server error", "code": "ERR_DATABASE_CONNECTION"}',
  //   },
  // ];

  const requests = data;

  const getMethodColor = (method: string) => {
    const colors: Record<string, string> = {
      GET: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      POST: "bg-green-500/10 text-green-400 border-green-500/20",
      PUT: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      DELETE: "bg-red-500/10 text-red-400 border-red-500/20",
      PATCH: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    };
    return colors[method] || "bg-gray-500/10 text-gray-400 border-gray-500/20";
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-green-400";
    if (status >= 300 && status < 400) return "text-blue-400";
    if (status >= 400 && status < 500) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <>
      {/*<div>
        <Group />
      </div>*/}

      {/* Main Content */}
      <main className="px-6 py-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-white mb-1">
            Request History
          </h2>
          <p className="text-sm text-gray-500">
            Monitoring {requests.length} requests
          </p>
        </div>

        {/* Request List */}
        <div className="space-y-3">
          {requests.map((request) => (
            <Link
              key={request.id}
              to="/requests/$requestId"
              params={{ requestId: request.id }}
            >
              About
              <div className="bg-[#1e2230] border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors cursor-pointer">
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
                    <div className="text-xs text-gray-500 mb-1">
                      Response Preview
                    </div>
                    <div className="font-mono text-xs text-gray-400 bg-[#151820] px-3 py-2 rounded border border-gray-800 overflow-hidden">
                      <div className="truncate whitespace-pre-wrap">
                        {JSON.stringify(request.response).substring(0, 200)}
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 text-xs text-gray-600">
                    {request.timestamp}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State (hidden when there are requests) */}
        {requests.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">
              No requests yet
            </h3>
            <p className="text-gray-600 text-xs">
              Requests will appear here as they come in
            </p>
          </div>
        )}
      </main>
    </>
  );
}
