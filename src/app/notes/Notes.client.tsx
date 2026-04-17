'use client';

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Button from '@/components/Button/Button';
import Container from '@/components/Container/Container';
import Modal from '@/components/Modal/Modal';
import NoteForm, { type NoteFormValues } from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { createNote, deleteNote, fetchNotes } from '@/lib/noteService';

interface NotesClientProps {
  initialSearch: string;
  initialPage: number;
}

const NotesClient = ({ initialSearch, initialPage }: NotesClientProps) => {
  const [query, setQuery] = useState<string>(initialSearch);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { data, isError, isFetching } = useQuery({
    queryKey: ['notes', query, currentPage],
    queryFn: () => fetchNotes({ search: query, page: currentPage }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 1;
  const notes = data?.notes ?? [];

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
      handleClose();
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleChanged = useDebouncedCallback((value: string) => {
    setQuery(value);
    setCurrentPage(1);
  }, 1000);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (values: NoteFormValues) => {
    await createNoteMutation.mutateAsync(values);
  };

  const handleDeleteClick = (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this note?');
    if (!confirmed) return;

    deleteNoteMutation.mutate(id);
  };

  return (
    <>
      <Container className="flex flex-col gap-4">
        <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <div className="w-full max-w-md">
            <SearchBox onSubmit={handleChanged} defaultValue={query} isLoading={isFetching} />
          </div>

          <div className="flex items-center justify-start gap-3 md:justify-end">
            <Button variant="primary" onClick={handleClick}>
              Create note +
            </Button>
          </div>
        </section>

        <section className="space-y-6">
          {isError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm dark:border-red-900 dark:bg-red-950/40">
              <p className="text-sm text-red-600 dark:text-red-400">
                Something went wrong while loading notes.
              </p>
            </div>
          ) : notes.length > 0 ? (
            <>
              <NoteList notes={notes} onDelete={handleDeleteClick} />

              {totalPages > 1 && (
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setPage={setCurrentPage}
                />
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                No notes found. Try another search or create your first note.
              </p>
            </div>
          )}
        </section>

        {isModalOpen && (
          <Modal onClose={handleClose}>
            <NoteForm onSubmit={handleSubmit} onCancel={handleClose} />
          </Modal>
        )}
      </Container>
    </>
  );
};

export default NotesClient;
