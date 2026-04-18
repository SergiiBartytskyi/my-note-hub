'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import Container from '@/components/Container/Container';
import Button from '@/components/Button/Button';
import { useNote } from '@/hooks/useNote';
import { useDeleteNote } from '@/hooks/useDeleteNote';

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: note, isLoading, error } = useNote(id, !isDeleting);

  const deleteNoteMutation = useDeleteNote();

  const handleDelete = async () => {
    if (!id) return;

    const confirmed = window.confirm('Are you sure you want to delete this note?');
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      await deleteNoteMutation.mutateAsync(id);
      router.replace('/notes');
    } catch (error) {
      setIsDeleting(false);
      console.error('Failed to delete note:', error);

      // ToDo: Show error toast to user
    }
  };

  if (isLoading) {
    return (
      <Container>
        <div className="py-8">
          <p className="text-sm text-slate-500 dark:text-slate-400">Loading note...</p>
        </div>
      </Container>
    );
  }

  if (isDeleting || deleteNoteMutation.isPending) {
    return (
      <Container>
        <div className="py-8">
          <p className="text-sm text-slate-500 dark:text-slate-400">Deleting note...</p>
        </div>
      </Container>
    );
  }

  if (error || !note) {
    return (
      <Container>
        <div className="py-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm dark:border-red-900 dark:bg-red-950/40">
            <p className="text-sm text-red-600 dark:text-red-400">
              Something went wrong while loading this note.
            </p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <section className="mx-auto max-w-3xl py-6">
        <Link
          href="/notes"
          className="mb-4 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-300 dark:hover:text-blue-400"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to notes
        </Link>

        <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <header className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">{note.title}</h1>

              <div className="mt-3 flex flex-wrap items-center gap-2 md:gap-4">
                <span className="inline-flex max-w-full items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {note.tag}
                </span>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Created {formatDate(note.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="secondary">
                <Pencil className="h-4 w-4" aria-hidden="true" />
                Edit
              </Button>

              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={isDeleting || deleteNoteMutation.isPending}
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                {isDeleting || deleteNoteMutation.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </header>

          <div className="pt-6">
            <p className="whitespace-pre-wrap text-base leading-7 text-foreground">
              {note.content}
            </p>
          </div>
        </article>
      </section>
    </Container>
  );
};

export default NoteDetailsClient;
