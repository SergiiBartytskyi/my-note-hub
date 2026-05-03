import Modal from '@/components/Modal/Modal';

import { NoteDto } from '@/types/note';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

interface NotePreviewModalProps {
  note: NoteDto;
}

const NotePreviewModal = ({ note }: NotePreviewModalProps) => {
  return (
    <Modal>
      <div className="flex min-h-52 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="mb-2 line-clamp-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
              {note.title}
            </h2>
          </div>
          <p className="mb-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {note.content}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {note.tag}
          </span>

          <div className="flex items-center gap-2">
            <Link
              href={`/notes/${note.id}/edit`}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-slate-800 dark:text-blue-400"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreviewModal;
