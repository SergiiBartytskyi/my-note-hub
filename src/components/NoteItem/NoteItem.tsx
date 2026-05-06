'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import type { NoteTag } from '../../types/note';
import Button from '../Button/Button';
import { Eye } from 'lucide-react';
import { truncateText } from '@/utils/truncate';

interface NoteItemProps {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  onDelete: (id: string) => void;
}

const NoteItem = ({ id, title, content, tag, onDelete }: NoteItemProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const from = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

  return (
    <li className="flex min-h-52 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="mb-2 line-clamp-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
            {truncateText(title, 20)}
          </h2>
        </div>
        <p className="mb-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {truncateText(content, 120)}
        </p>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {tag}
        </span>

        <div className="flex items-center gap-2">
          <Link
            href={`/notes/${id}?from=${encodeURIComponent(from)}`}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-slate-800 dark:text-blue-400"
          >
            <Eye className="h-4 w-4" />
            Open
          </Link>

          <Button variant="danger" onClick={() => onDelete(id)}>
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
};

export default NoteItem;
