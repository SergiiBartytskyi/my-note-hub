'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Container from '@/components/Container/Container';
import Button from '@/components/Button/Button';
import NoteForm, { type NoteFormValues } from '@/components/NoteForm/NoteForm';
import type { NoteDto } from '@/types/note';
import { ArrowLeft } from 'lucide-react';

interface EditNoteClientProps {
  note: NoteDto;
}

const EditNoteClient = ({ note }: EditNoteClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get('from') || '/notes/filter/all';
  const returnTo = from?.startsWith('/notes/filter/') ? from : '/notes/filter/all';

  const initialValues: NoteFormValues = {
    title: note.title,
    content: note.content,
    tag: note.tag,
  };

  const handleSubmit = async (values: NoteFormValues) => {
    // тут буде update mutation
    // await updateNoteMutation.mutateAsync({ id: note.id, values });

    console.log(values);

    router.replace(returnTo);
  };

  const handleCancel = () => {
    router.replace(returnTo);
  };

  return (
    <Container>
      <section className="mx-auto max-w-3xl">
        <Button variant="ghost" type="button" onClick={handleCancel} className="mb-4 gap-2">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to notes
        </Button>

        <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <header className="mb-6 border-b border-border pb-4">
            <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">Edit note</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Update the title, content, or tag of this note.
            </p>
          </header>

          <NoteForm
            initialValues={initialValues}
            submitLabel="Save changes"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </article>
      </section>
    </Container>
  );
};

export default EditNoteClient;
