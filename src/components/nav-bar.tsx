import { useTheme } from "@/contexts/theme-provider.tsx";
import { Sun, Moon } from "lucide-react";
import { useRequestStore } from "@/store";
import { Button } from "@/components/ui/button";

export function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const fileName = useRequestStore((state) => state.fileName);
  const clear = useRequestStore((state) => state.clear);

  return (
    <div className="bg-(--secondary-background) border-b border-(--panel-border) p-4">
      <div className="container m-auto font-mono font-semibold flex items-center justify-between">
        <div>PEEK</div>
        <div className="flex items-center">
          {fileName && (
            <Button className="mr-20" onClick={clear}>
              Load new file
            </Button>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 text-sm dark:text-slate-400 text-gray-600 transition-all duration-200 rounded-lg font-medium"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
