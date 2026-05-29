import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EditNoteClient from './EditNote.client';
import { fetchNoteByIdServer } from '@/lib/services/serverNoteService';

interface EditNotePageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: 'Edit Note - Note Hub',
  description: 'Edit your note information and settings.',
};

const EditNotePage = async ({ params }: EditNotePageProps) => {
  const { id } = await params;

  let note;

  try {
    note = await fetchNoteByIdServer(id);
  } catch {
    notFound();
  }

  if (!note) {
    notFound();
  }

  return <EditNoteClient note={note} />;
};

export default EditNotePage;
