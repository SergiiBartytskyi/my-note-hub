import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/noteService';
import NotesClient from './Notes.client';
import { getQueryClient } from '@/lib/queryClient';

export const metadata: Metadata = {
  title: 'Notes page - NoteHub',
};

interface NotesPageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

const NotesPage = async ({ searchParams }: NotesPageProps) => {
  const params = await searchParams;
  const search = params.search ?? '';
  const page = Number(params.page ?? '1');

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes({ search, page }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialSearch={search} initialPage={page} />
    </HydrationBoundary>
  );
};

export default NotesPage;
