import { notFound } from 'next/navigation';
import NotePreviewModal from './NotePreviewModal.client';
import { NoteDto } from '@/types/note';
import { fetchNoteByIdServer } from '@/lib/services/serverNoteService';

interface NotePreviewProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: NotePreviewProps) => {
  const { id } = await params;

  let note: NoteDto | null = null;

  try {
    note = await fetchNoteByIdServer(id);
  } catch {
    notFound();
  }

  if (!note) {
    notFound();
  }

  return <NotePreviewModal note={note} />;
};

export default Page;
