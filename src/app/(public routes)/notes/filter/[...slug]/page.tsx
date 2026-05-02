import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { fetchNotes } from '@/lib/noteService';
import NotesClient from './Notes.client';
import { getQueryClient } from '@/lib/queryClient';
import { NoteTag } from '@/types/note';

export const metadata: Metadata = {
  title: 'Notes page - NoteHub',
};

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ search?: string; page?: string }>;
}

const validRouteTags = ['all', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;

type RouteTag = (typeof validRouteTags)[number];

const NotesPage = async ({ params, searchParams }: NotesPageProps) => {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const routeTag = slug?.[0];

  if (!routeTag || !validRouteTags.includes(routeTag as RouteTag)) {
    notFound();
  }

  const search = resolvedSearchParams.search ?? '';
  const page = Number(resolvedSearchParams.page ?? '1');

  if (!Number.isInteger(page) || page < 1) {
    notFound();
  }

  const tag: NoteTag | undefined = routeTag === 'all' ? undefined : (routeTag as NoteTag);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', search, tag ?? 'all', page],
    queryFn: () => fetchNotes({ search, tag, page }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-1 w-full">
        <NotesClient initialSearch={search} initialTag={routeTag as RouteTag} initialPage={page} />
      </div>
    </HydrationBoundary>
  );
};

export default NotesPage;
