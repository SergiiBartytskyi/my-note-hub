'use client';

import { Search, Loader2, X } from 'lucide-react';
import { useState } from 'react';

interface SearchBoxProps {
  onSubmit: (query: string) => void;
  defaultValue?: string;
  isLoading?: boolean;
}

const SearchBox = ({ onSubmit, defaultValue = '', isLoading = false }: SearchBoxProps) => {
  const [query, setQuery] = useState(defaultValue);

  const handleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSubmit(value);
  };

  const handlerClean = () => {
    setQuery('');
    onSubmit('');
  };

  return (
    <div className="relative w-full">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />

      <input
        type="text"
        name="query"
        value={query}
        onChange={handleChanged}
        placeholder="Search notes"
        autoComplete="off"
        className="h-10 w-full rounded-lg border border-slate-300 bg-surface-solid pl-10 pr-10 py-2 text-base text-foreground placeholder:text-slate-400 shadow-sm outline-none transition-colors hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:ring-blue-500 dark:hover:focus:ring-blue-500 dark:focus:ring-offset-slate-950"
        aria-label="Search notes"
      />

      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-slate-400" aria-hidden="true" />
        ) : query ? (
          <button
            type="button"
            onClick={handlerClean}
            className="inline-flex h-6 w-6 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-slate-800 dark:hover:text-slate-200 dark:focus-visible:ring-blue-400"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default SearchBox;
