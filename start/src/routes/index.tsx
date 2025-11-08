import { createFileRoute, useNavigate } from '@tanstack/react-router';
import type { RequestData } from '@/types/request-data';
import { getRequests } from '@/data/get-requests';
import { Button } from '@/components/ui/button';
import { RequestRow } from '@/components/request-row';

export const Route = createFileRoute('/')({
  ssr: 'data-only',
  component: App,
  validateSearch: (search) => search as { q: string },
  loaderDeps: ({ search: { q } }) => ({ q }),
  loader: async ({ deps }) =>
    await getRequests({ data: { search: { q: deps.q } } }),
  pendingComponent: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-gray-500">Loading requests...</div>
    </div>
  ),
});

function App() {
  const requests: Array<RequestData> = Route.useLoaderData();
  const navigate = useNavigate({ from: '/' });

  function search() {
    navigate({ to: '/', search: { q: 'carlos henrique' } });
  }

  return (
    <>
      <main className="px-6 py-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-white mb-1">
            Request History
          </h2>
          <p className="text-sm text-gray-500">
            Monitoring {requests.length} requests
          </p>
          <div>
            <Button onClick={search}>Search "queryyy"</Button>
          </div>
        </div>

        {/* Request List */}
        <div className="space-y-3">
          {requests.map((request) => (
            <RequestRow key={request.id} request={request} />
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
