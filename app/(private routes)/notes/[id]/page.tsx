import type { Metadata } from 'next';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import NoteDetailsClient from './NoteDetails.client';
import { getQueryClient } from '../../../../lib/queryClient';
import { fetchNoteByIdServer } from '../../../../lib/services/serverNoteService';

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: NoteDetailsPageProps): Promise<Metadata> => {
  const { id } = await params;

  const fallbackMetadata: Metadata = {
    title: 'Note Not Found',
    description: 'The requested note could not be found in Note Hub.',
  };

  try {
    const note = await fetchNoteByIdServer(id);

    if (!note) {
      return fallbackMetadata;
    }

    const description = note?.content?.slice(0, 160) || 'View and organize your notes in Note Hub.';

    return {
      title: note?.title,
      description,
      openGraph: {
        title: `${note.title} | Note Hub`,
        description,
        url: `/notes/${id}`,
        siteName: 'Note Hub',
        type: 'article',
        images: [
          {
            url: '/og_image_notehub_v2.jpg',
            width: 1200,
            height: 630,
            alt: 'Note Hub preview image',
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${note?.title} | Note Hub`,
        description,
        images: ['/og_image_notehub_v2.jpg'],
      },
    };
  } catch {
    return fallbackMetadata;
  }
};

const NoteDetails = async ({ params }: NoteDetailsPageProps) => {
  const { id } = await params;
  const queryClient = getQueryClient();

  try {
    const note = await queryClient.fetchQuery({
      queryKey: ['note', id],
      queryFn: () => fetchNoteByIdServer(id),
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
