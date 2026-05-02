'use client';

import { useRouter } from 'next/navigation';

const filterTags = ['all', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;

export type FilterTag = (typeof filterTags)[number];

interface CategorySelectProps {
  value: FilterTag;
}

const CategorySelect = ({ value }: CategorySelectProps) => {
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextCategory = event.target.value as FilterTag;
    router.push(`/notes/filter/${nextCategory}`);
  };

  return (
    <label className="flex items-center gap-2">
      <span className="text-sm font-medium text-foreground">Category</span>

      <select
        value={value}
        onChange={handleChange}
        className="rounded-lg border border-border bg-surface-solid px-3 py-2 text-sm text-foreground outline-none transition focus:border-blue-500"
      >
        {filterTags.map(tag => (
          <option key={tag} value={tag}>
            {tag === 'all' ? 'All' : tag}
          </option>
        ))}
      </select>
    </label>
  );
};

export default CategorySelect;
