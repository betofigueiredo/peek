import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';

import appCss from '../styles.css?url';

import type { QueryClient } from '@tanstack/react-query';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-[#1a1d2e] via-[#1f2335] to-[#16182a] text-slate-200">
          {/* Header */}
          <header className="border-b border-[#2a2f45]/50 bg-gradient-to-r from-[#252837]/95 to-[#1e2230]/90 backdrop-blur-sm shadow-lg">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 bg-gradient-to-br from-[#c45f6d] to-[#b54f5d] rounded-lg flex items-center justify-center shadow-lg shadow-[#c45f6d]/20 group-hover:shadow-[#c45f6d]/40 transition-all">
                    <span className="text-white font-bold text-lg">P</span>
                    <div className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-cyan-400 border-2 border-[#252837] shadow-sm shadow-cyan-400/50"></div>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white tracking-tight">
                      Peek
                    </h1>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                      Request Monitor
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 text-sm text-slate-400 hover:text-[#c45f6d] hover:bg-[#c45f6d]/10 transition-all duration-200 rounded-lg font-medium">
                    Clear All
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#c45f6d] to-[#b54f5d] hover:from-[#d46f7d] hover:to-[#c45f6d] text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-[#c45f6d]/20 hover:shadow-[#c45f6d]/40">
                    Export
                  </button>
                </div>
              </div>
            </div>
          </header>
          {children}
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
        </div>
        <Scripts />
      </body>
    </html>
  );
}
