'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/noteService';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <main className="flex-1">
      <div className="max-w-200 mx-auto my-8 p-6 bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-[#ddd] pb-2">
            <h2 className="m-0 text-[28px] text-[#333]">{note.title}</h2>
          </div>
          <p className="inline-block px-2 py-1 text-[12px] text-[#0d6efd] bg-[#e7f1ff] border border-[#b6d4fe] rounded-xl max-w-25 whitespace-nowrap overflow-hidden text-overflow-ellipsis">
            {note.tag}
          </p>
          <p className="text-[18px] leading-6.5 color-[#444] whitespace-pre-wrap">{note.content}</p>
          <p className="text-[14px] text-[#888] text-right">{note.createdAt}</p>
        </div>
      </div>
    </main>
  );
};

export default NoteDetailsClient;
