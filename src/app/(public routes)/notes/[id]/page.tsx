import { Metadata } from 'next';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import NoteDetailsClient from './NoteDetails.client';
import { getQueryClient } from '@/lib/queryClient';
import { fetchNoteById } from '@/lib/noteService';

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({ params }: NoteDetailsPageProps): Promise<Metadata> => {
  const { id } = await params;
  const note = await fetchNoteById(id);

  const description = note?.content?.slice(0, 160) || 'View and organize your notes in NoteHub.';

  return {
    title: `Note: ${note?.title || 'Not Found'} - Note Hub`,
    description,
    openGraph: {
      title: `Note: ${note?.title || 'Not Found'} - Note Hub`,
      description,
      url: `https://my-note-hub.vercel.app/notes/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://drive.google.com/uc?export=view&id=195td0ub4MBQeHL21LvRfGO0cz9dQi18M',
          width: 1200,
          height: 630,
          alt: note?.title || 'Not Found',
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${note?.title || 'Not Found'} - Note Hub`,
      description,
      images: ['https://drive.google.com/uc?export=view&id=195td0ub4MBQeHL21LvRfGO0cz9dQi18M'],
    },
  };
};

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
