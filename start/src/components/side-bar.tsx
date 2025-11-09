import { Link } from '@tanstack/react-router';
import { ChartNoAxesColumn, Logs } from 'lucide-react';

export function SideBar() {
  return (
    <div className="fixed top-0 left-0 h-full w-24 border-r border-(--panel-border) bg-(--panel-bg) overflow-y-auto">
      <div className="py-8">
        <ChartNoAxesColumn
          strokeWidth={5}
          className="m-auto rotate-45 text-[#E5F33C]"
        />
      </div>
      <nav className="flex flex-col items-center py-4 space-y-4">
        <Link
          to="/v2"
          className="text-center text-(--link-color) hover:underline"
        >
          <Logs className="m-auto font-mono text-xs text-gray-500 group-hover:text-[#c45f6d] transition-colors" />
          REQUESTS
        </Link>
      </nav>
    </div>
  );
}
