import { createFileRoute, useNavigate } from '@tanstack/react-router';
import type { RequestData } from '@/types/request-data';
import { getRequests } from '@/data/get-requests';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Combobox } from '@/components/ui/combobox';
import { RequestRow } from '@/components/request-row';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Calendar,
  Clock,
  Zap,
} from 'lucide-react';

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

  // Sample data for filters (to be replaced with real data later)
  const methodOptions = [
    { value: 'get', label: 'GET' },
    { value: 'post', label: 'POST' },
    { value: 'put', label: 'PUT' },
    { value: 'delete', label: 'DELETE' },
    { value: 'patch', label: 'PATCH' },
  ];

  const statusOptions = [
    { value: '2xx', label: '2xx Success' },
    { value: '3xx', label: '3xx Redirect' },
    { value: '4xx', label: '4xx Client Error' },
    { value: '5xx', label: '5xx Server Error' },
  ];

  const timeRangeOptions = [
    { value: 'last-hour', label: 'Last Hour' },
    { value: 'last-24h', label: 'Last 24 Hours' },
    { value: 'last-7d', label: 'Last 7 Days' },
    { value: 'last-30d', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' },
  ];

  return (
    <>
      <main className="px-6 py-6 min-h-screen bg-gradient-to-br from-[#1a1d2e] via-[#1f2335] to-[#16182a]">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-1 tracking-tight">
                Request History
              </h2>
              <div className="flex items-center gap-3 text-sm">
                <p className="text-neutral-400">
                  Monitoring{' '}
                  <span className="font-medium text-white">
                    {requests.length}
                  </span>{' '}
                  requests
                </p>
                <div className="h-1 w-1 rounded-full bg-neutral-600"></div>
                <p className="text-neutral-500 text-xs">
                  Last updated: just now
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-[#c45f6d]/10 border border-[#c45f6d]/20 flex items-center gap-2">
                <div className="size-2 rounded-full bg-[#c45f6d] animate-pulse shadow-sm shadow-[#c45f6d]/50"></div>
                <span className="text-xs font-medium text-[#c45f6d]">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Panel - Inspired by professional audio interfaces */}
        <div className="mb-8 rounded-xl bg-gradient-to-b from-[#252837]/95 to-[#1e2230]/80 border border-[#2a2f45]/50 shadow-2xl backdrop-blur-sm overflow-hidden">
          {/* Filter Header Bar */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-[#2a2f45]/80 via-[#252837]/60 to-[#2a2f45]/80 border-b border-[#363b52]/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-[#c45f6d]/10 border border-[#c45f6d]/20">
                  <Filter className="size-3.5 text-[#c45f6d]" />
                </div>
                <span className="text-sm font-semibold text-slate-200 tracking-wide uppercase">
                  Filters
                </span>
              </div>
              <div className="h-4 w-px bg-[#363b52]/50"></div>
              <div className="flex items-center gap-1.5">
                <div className="size-1.5 rounded-full bg-[#c45f6d] shadow-sm shadow-[#c45f6d]/30"></div>
                <div className="size-1.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/30"></div>
                <div className="size-1.5 rounded-full bg-cyan-500 shadow-sm shadow-cyan-500/30"></div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-[#c45f6d] hover:bg-[#c45f6d]/10 transition-all duration-200 h-7 px-2.5 text-xs"
            >
              <X className="size-3.5 mr-1" />
              Reset
            </Button>
          </div>

          {/* Filter Content */}
          <div className="p-6 space-y-6">
            {/* Primary Controls Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Global Search - Large prominent input */}
              <div className="lg:col-span-6">
                <label className="block text-[10px] font-bold text-slate-500 mb-2 tracking-wider uppercase">
                  Global Search
                </label>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-500 group-hover:text-[#c45f6d] transition-colors" />
                  <Input
                    type="text"
                    placeholder="Search by URL, endpoint, query parameters..."
                    className="pl-11 pr-4 h-11 bg-[#1a1d2e]/50 border-[#2a2f45]/50 text-white placeholder:text-slate-600 hover:border-[#c45f6d]/30 focus:border-[#c45f6d]/50 focus:bg-[#1a1d2e]/80 transition-all duration-200 rounded-lg shadow-inner"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-[#2a2f45]/50 border border-[#363b52]/50 rounded">
                      ⌘K
                    </kbd>
                  </div>
                </div>
              </div>

              {/* HTTP Method Selector */}
              <div className="lg:col-span-3">
                <label className="block text-[10px] font-bold text-slate-500 mb-2 tracking-wider uppercase flex items-center gap-1.5">
                  <Zap className="size-3" />
                  HTTP Method
                </label>
                <div className="relative">
                  <Combobox
                    options={methodOptions}
                    callback={(value) => console.log('Method:', value)}
                    className="w-full h-11 bg-[#1a1d2e]/50 border-[#2a2f45]/50 text-white hover:bg-[#1a1d2e]/80 hover:border-[#c45f6d]/30 transition-all duration-200 rounded-lg shadow-inner"
                  />
                </div>
              </div>

              {/* Status Code Selector */}
              <div className="lg:col-span-3">
                <label className="block text-[10px] font-bold text-slate-500 mb-2 tracking-wider uppercase">
                  Status Code
                </label>
                <div className="relative">
                  <Combobox
                    options={statusOptions}
                    callback={(value) => console.log('Status:', value)}
                    className="w-full h-11 bg-[#1a1d2e]/50 border-[#2a2f45]/50 text-white hover:bg-[#1a1d2e]/80 hover:border-cyan-500/30 transition-all duration-200 rounded-lg shadow-inner"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#363b52]/50"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 text-[10px] font-bold text-slate-600 bg-[#252837]/90 uppercase tracking-wider">
                  Advanced Parameters
                </span>
              </div>
            </div>

            {/* Advanced Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Time Range */}
              <div className="lg:col-span-2">
                <label className="block text-[10px] font-bold text-slate-500 mb-2 tracking-wider uppercase flex items-center gap-1.5">
                  <Calendar className="size-3" />
                  Time Range
                </label>
                <Combobox
                  options={timeRangeOptions}
                  callback={(value) => console.log('Time range:', value)}
                  className="w-full h-10 bg-[#1a1d2e]/50 border-[#2a2f45]/50 text-white hover:bg-[#1a1d2e]/80 hover:border-amber-500/30 transition-all duration-200 rounded-lg shadow-inner text-sm"
                />
              </div>

              {/* Duration Min */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-2 tracking-wider uppercase flex items-center gap-1.5">
                  <Clock className="size-3" />
                  Min (ms)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0"
                    className="h-10 bg-[#1a1d2e]/50 border-[#2a2f45]/50 text-white placeholder:text-slate-700 hover:border-amber-500/30 focus:border-amber-500/50 transition-all duration-200 rounded-lg shadow-inner text-sm pr-8"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-slate-600">
                    ms
                  </div>
                </div>
              </div>

              {/* Duration Max */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-2 tracking-wider uppercase">
                  Max (ms)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="∞"
                    className="h-10 bg-[#1a1d2e]/50 border-[#2a2f45]/50 text-white placeholder:text-slate-700 hover:border-amber-500/30 focus:border-amber-500/50 transition-all duration-200 rounded-lg shadow-inner text-sm pr-8"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-slate-600">
                    ms
                  </div>
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-2 tracking-wider uppercase">
                  Min Size
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0"
                    className="h-10 bg-[#1a1d2e]/50 border-[#2a2f45]/50 text-white placeholder:text-slate-700 hover:border-cyan-500/30 focus:border-cyan-500/50 transition-all duration-200 rounded-lg shadow-inner text-sm pr-8"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-slate-600">
                    KB
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="flex items-end">
                <Button className="w-full h-10 bg-gradient-to-r from-[#c45f6d] to-[#b54f5d] hover:from-[#d46f7d] hover:to-[#c45f6d] text-white font-semibold text-sm shadow-lg shadow-[#c45f6d]/20 hover:shadow-[#c45f6d]/40 transition-all duration-200 rounded-lg">
                  Apply
                </Button>
              </div>
            </div>

            {/* Active Filters - Tag Display */}
            <div className="pt-4 border-t border-[#363b52]/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                  Active Filters
                </span>
                <div className="text-[10px] text-slate-600">2 applied</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {/* Active filter tags */}
                <div className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-br from-[#c45f6d]/10 to-[#c45f6d]/5 border border-[#c45f6d]/30 hover:border-[#c45f6d]/50 transition-all duration-200">
                  <div className="size-1.5 rounded-full bg-[#c45f6d] shadow-sm shadow-[#c45f6d]/50"></div>
                  <span className="text-xs font-medium text-[#c45f6d]/90">
                    Method
                  </span>
                  <span className="text-xs text-[#c45f6d] font-semibold">
                    GET
                  </span>
                  <button className="ml-1 hover:text-[#c45f6d]/80 text-[#c45f6d] transition-colors">
                    <X className="size-3" />
                  </button>
                </div>
                <div className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-200">
                  <div className="size-1.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50"></div>
                  <span className="text-xs font-medium text-cyan-300">
                    Status
                  </span>
                  <span className="text-xs text-cyan-200 font-semibold">
                    2xx
                  </span>
                  <button className="ml-1 hover:text-cyan-200 text-cyan-400 transition-colors">
                    <X className="size-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="h-1 bg-gradient-to-r from-transparent via-[#c45f6d]/30 to-transparent"></div>
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
