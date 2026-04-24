import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/noteService';
import NotesClient from './Notes.client';
import { getQueryClient } from '@/lib/queryClient';

export const metadata: Metadata = {
  title: 'Notes page - NoteHub',
};

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ search?: string; page?: string }>;
}

const NotesPage = async ({ params, searchParams }: NotesPageProps) => {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const search = resolvedSearchParams.search ?? '';
  const page = Number(resolvedSearchParams.page ?? '1');
  const categoryId = slug[0] === 'all' ? undefined : slug[0];

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', search, categoryId, page],
    queryFn: () => fetchNotes({ search, categoryId, page }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialSearch={search} initialCategoryId={categoryId} initialPage={page} />
    </HydrationBoundary>
  );
};

export default NotesPage;
