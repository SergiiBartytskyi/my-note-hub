interface SearchBoxProps {
  onSubmit: (query: string) => void;
  defaultValue?: string;
}

const SearchBox = ({ onSubmit, defaultValue }: SearchBoxProps) => {
  const handleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    onSubmit(value);
  };

  return (
    <>
      <input
        type="text"
        name="query"
        defaultValue={defaultValue}
        onChange={handleChanged}
        placeholder="Search notes"
        autoComplete="off"
        className="h-10 w-full rounded-lg border border-slate-300 bg-white px-4 text-base text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition-colors hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:ring-blue-600 dark:hover:focus:ring-blue-500 dark:focus:ring-offset-slate-950 md:max-w-xs"
      />
    </>
  );
};

export default SearchBox;
