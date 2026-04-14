import Link from 'next/link';
import type { NoteTag } from '../../types/note';
import Button from '../Button/Button';

interface NoteItemProps {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  onDelete: (id: string) => void;
}

const NoteItem = ({ id, title, content, tag, onDelete }: NoteItemProps) => {
  return (
    <li className="flex min-h-52 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
      <div className="flex flex-col">
        <h2 className="mb-2 line-clamp-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h2>
        <p className="mb-4 text-sm leading-6 text-slate-600 dark:text-slate-400">{content}</p>
      </div>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-800">
        <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {tag}
        </span>
        <Link
          href={`/notes/${id}`}
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View details
        </Link>
        <Button variant="danger" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </div>
    </li>
  );
};

export default NoteItem;
