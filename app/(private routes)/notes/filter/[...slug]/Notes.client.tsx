'use client';

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useNotes } from '../../../../../hooks/useNotes';
import { useCreateNote } from '../../../../../hooks/useCreateNote';
import { useDeleteNote } from '../../../../../hooks/useDeleteNote';
import CategorySelect from '@/components/CategorySelect/CategorySelect';
import Container from '@/components/Container/Container';
import { RouteTag, NoteFormValues } from '../../../../../types/note';
import { useMe } from '../../../../../hooks/useMe';

interface NotesClientProps {
  initialSearch: string;
  initialTag: RouteTag;
  initialPage: number;
}

const NotesClient = ({ initialSearch, initialTag, initialPage }: NotesClientProps) => {
  const [query, setQuery] = useState<string>(initialSearch);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: user } = useMe();
  const isAuthenticated = !!user;

  const backendTag = initialTag === 'all' ? undefined : initialTag;

  const { data, isPending, isFetching, isError, isSuccess } = useNotes({
    search: query,
    tag: backendTag,
    page: currentPage,
  });

  const createNoteMutation = useCreateNote();
  const deleteNoteMutation = useDeleteNote();

  const totalPages = data?.totalPages ?? 1;
  const notes = data?.notes ?? [];

  const handleChanged = useDebouncedCallback((value: string) => {
    setQuery(value);
    setCurrentPage(1);
  }, 1000);

  const handleClick = () => setIsModalOpen(true);

  const handleClose = () => setIsModalOpen(false);

  const handleSubmit = async (values: NoteFormValues) => {
    try {
      await createNoteMutation.mutateAsync(values);
      handleClose();
    } catch {
      // handled in mutation onError
    }
  };

  const handleDeleteClick = (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this note?');
    if (!confirmed) return;

    deleteNoteMutation.mutate(id);
  };

  const showInitialLoader = isPending && !data;
  const showError = isError && !data;
  const showEmpty = isSuccess && notes.length === 0;
  const showList = notes.length > 0;
  const showNotAuthenticated = !isAuthenticated;

  if (showNotAuthenticated) {
    return (
      <div className="flex flex-1 w-full items-center justify-center">
        <Container className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Please sign in to view your notes.
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="flex flex-1 w-full flex-col gap-4">
      <section className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center rounded-2xl border border-border bg-surface p-4 shadow-sm ">
        <div className="w-full max-w-md">
          <SearchBox onSubmit={handleChanged} defaultValue={query} isLoading={isFetching} />
        </div>

        <div>
          <CategorySelect value={initialTag} />
        </div>

        <div className="flex items-center justify-start gap-3 md:justify-end">
          <Button variant="primary" onClick={handleClick}>
            Create note +
          </Button>
        </div>
      </section>

      <section className="flex min-h-[calc(100dvh-320px)]">
        {showInitialLoader ? (
          <Container className="flex flex-col items-center justify-center gap-3 w-full rounded-2xl border border-border bg-surface p-4 shadow-sm">
            <p className="text-sm text-slate-600 dark:text-slate-300">Loading notes...</p>
          </Container>
        ) : showError ? (
          <Container className="flex flex-col items-center justify-center gap-3 w-full rounded-2xl border border-border bg-surface p-4 shadow-sm">
            <p className="text-sm text-red-600 dark:text-red-400">
              Something went wrong while loading notes.
            </p>
          </Container>
        ) : showEmpty ? (
          <Container className="flex flex-col items-center justify-center gap-3 w-full rounded-2xl border border-border bg-surface p-4 shadow-sm">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              No notes found. Try another search or create your first note.
            </p>
          </Container>
        ) : showList ? (
          <div className="w-full space-y-6">
            <NoteList notes={notes} onDelete={handleDeleteClick} />

            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setPage={setCurrentPage}
              />
            )}
          </div>
        ) : null}
      </section>

      {isModalOpen && (
        <Modal onClose={handleClose}>
          <NoteForm onSubmit={handleSubmit} onCancel={handleClose} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
