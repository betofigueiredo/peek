import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';
import { ThemeProvider, useTheme } from '../contexts/theme-context';

import '@fontsource-variable/lora';
import '@fontsource/ibm-plex-mono/300.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import appCss from '../styles.css?url';

import type { QueryClient } from '@tanstack/react-query';
import { SideBar } from '@/components/side-bar';

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
        <ThemeProvider>
          <AppContent>{children}</AppContent>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}

function AppContent({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen pl-24 bg-(--app-bg) text-foreground">
      <SideBar />
      {/* Header */}
      {/*<header className="border-b border-[var(--header-border)] bg-gradient-to-r from-[var(--header-bg-from)] to-[var(--header-bg-to)] backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-gradient-to-br from-[#c45f6d] to-[#b54f5d] rounded-lg flex items-center justify-center group-hover:shadow-[#c45f6d]/40 transition-all">
                <span className="text-white font-bold text-lg">P</span>
                <div className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-cyan-400 border-2 dark:border-[#252837] border-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold dark:text-white text-gray-900 tracking-tight">
                  Peek
                </h1>
                <p className="text-[10px] dark:text-slate-500 text-gray-500 font-semibold uppercase tracking-wider">
                  Request Monitor
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 text-sm dark:text-slate-400 text-gray-600 dark:hover:text-[#c45f6d] hover:text-[#c45f6d] dark:hover:bg-[#c45f6d]/10 hover:bg-[#c45f6d]/10 transition-all duration-200 rounded-lg font-medium"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="size-5" />
                ) : (
                  <Moon className="size-5" />
                )}
              </button>
              <button className="px-4 py-2 text-sm dark:text-slate-400 text-gray-600 dark:hover:text-[#c45f6d] hover:text-[#c45f6d] dark:hover:bg-[#c45f6d]/10 hover:bg-[#c45f6d]/10 transition-all duration-200 rounded-lg font-medium">
                Clear All
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-[#c45f6d] to-[#b54f5d] hover:from-[#d46f7d] hover:to-[#c45f6d] text-white text-sm font-semibold rounded-lg transition-all duration-200">
                Export
              </button>
            </div>
          </div>
        </div>
      </header>*/}
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
  );
}
