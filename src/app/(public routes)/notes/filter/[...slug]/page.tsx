import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { fetchNotes } from '@/lib/noteService';
import NotesClient from './Notes.client';
import { getQueryClient } from '@/lib/queryClient';
import { NoteTag } from '@/types/note';

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ search?: string; page?: string }>;
}

export const generateMetadata = async ({ params }: NotesPageProps): Promise<Metadata> => {
  const { slug } = await params;

  const routeTag = slug?.[0];

  if (!routeTag || !validRouteTags.includes(routeTag as RouteTag)) {
    return {
      title: 'Notes',
      description: 'Browse and manage your notes in Note Hub.',
    };
  }

  const filterLabel = routeTag === 'all' ? 'All Notes' : `${routeTag} Notes`;

  const description =
    routeTag === 'all'
      ? 'Browse all notes in Note Hub. Search, filter by category, and manage your notes with ease.'
      : `Browse ${routeTag.toLowerCase()} notes in Note Hub. Search, organize, and manage your notes with ease.`;

  return {
    title: filterLabel,
    description,
    openGraph: {
      title: `${filterLabel} | Note Hub`,
      description,
      url: `/notes/filter/${routeTag}`,
      siteName: 'Note Hub',
      type: 'website',
      images: [
        {
          url: '/og_image_notehub_v2.jpg',
          width: 1200,
          height: 630,
          alt: 'Note Hub preview image',
        },
      ],
    },
  };
};

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
