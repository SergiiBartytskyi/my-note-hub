import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import NoteDetailsClient from './NoteDetails.client';
import { getQueryClient } from '@/lib/queryClient';
import { fetchNoteById } from '@/lib/noteService';

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

const NoteDetails = async ({ params }: NoteDetailsPageProps) => {
  const { id } = await params;
  const queryClient = getQueryClient();

  try {
    const note = await queryClient.fetchQuery({
      queryKey: ['note', id],
      queryFn: () => fetchNoteById(id),
    });

    if (!note) {
      notFound();
    }
  } catch {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
};

export default NoteDetails;
