import { createFileRoute } from '@tanstack/react-router';
import type { RequestData } from '@/types/request-data';
import { getRequests } from '@/data/get-requests';
import { Graph } from '@/components/graph';
import { RequestRow2 } from '@/components/request-row2';
import { Filters } from '@/components/filters';

export const Route = createFileRoute('/')({
  ssr: 'data-only',
  component: RouteComponent,
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

function RouteComponent() {
  const requests: Array<RequestData> = Route.useLoaderData();

  return (
    <>
      <div className="bg-(--app-bg-2) border-b border-(--panel-border)">
        <div className="container m-auto pt-12">
          <h1 className="font-title font-semibold text-3xl">Requests</h1>
          <Filters />
          <Graph requests={requests} />
        </div>
      </div>
      <div className="container m-auto pt-8 pb-40">
        {requests.map((request) => (
          <RequestRow2 key={request.id} request={request} />
        ))}
      </div>
    </>
  );
}
