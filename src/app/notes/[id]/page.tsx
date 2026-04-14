import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { getQueryClient } from '@/lib/queryClient';
import { fetchNoteById } from '@/lib/noteService';

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

const NoteDetails = async ({ params }: NoteDetailsPageProps) => {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
