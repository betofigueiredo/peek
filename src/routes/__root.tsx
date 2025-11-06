import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="min-h-screen bg-[#1a1d29] text-gray-200">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#1e2230]">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <h1 className="text-xl font-semibold text-white">Peek</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200 transition-colors">
                Clear All
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
                Export
              </button>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}
