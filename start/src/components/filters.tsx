import { useEffect, useState } from 'react';
import { getRouteApi, useNavigate } from '@tanstack/react-router';
import { useDebouncedValue } from '@tanstack/react-pacer/debouncer';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function Filters() {
  const navigate = useNavigate({ from: '/' });
  const routeApi = getRouteApi('/');
  const { q } = routeApi.useSearch();
  const [instantSearch, setInstantSearch] = useState(q);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInstantSearch(e.target.value);
  }

  const [debouncedSearch] = useDebouncedValue(instantSearch, {
    wait: 500,
  });

  useEffect(() => {
    navigate({ to: '/', search: { q: debouncedSearch } });
  }, [debouncedSearch]);

  return (
    <div className="w-full pt-8">
      <Label htmlFor="email" className="font-mono">
        Search:
      </Label>
      <Input
        type="text"
        value={instantSearch}
        onChange={onChange}
        className="h-11 mt-2 dark:bg-[#363850] border border-[#161A26] transition-all duration-200 rounded-none"
      />
    </div>
  );
}
