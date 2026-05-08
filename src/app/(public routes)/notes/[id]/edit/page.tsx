import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchNoteById } from '@/lib/noteService';
import EditNoteClient from './EditNote.client';

interface EditNotePageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: 'Edit Note - My Note Hub',
  description: 'Edit your note information and settings.',
};

const EditNotePage = async ({ params }: EditNotePageProps) => {
  const { id } = await params;

  let note;

  try {
    note = await fetchNoteById(id);
  } catch {
    notFound();
  }

  if (!note) {
    notFound();
  }

  return <EditNoteClient note={note} />;
};

export default EditNotePage;
