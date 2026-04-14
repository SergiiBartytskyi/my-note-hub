'use client';

import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import NoteForm, { NoteFormValues } from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { createNote, deleteNote, fetchNotes } from '@/lib/noteService';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface NotesClientProps {
  initialSearch: string;
  initialPage: number;
}

const NotesClient = ({ initialSearch, initialPage }: NotesClientProps) => {
  const [query, setQuery] = useState<string>(initialSearch);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', query, currentPage],
    queryFn: () => fetchNotes({ search: query, page: currentPage }),
    placeholderData: keepPreviousData,
  });
  const totalPages = data?.totalPages || 1;

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
    <main className="flex-1">
      <section>
        <SearchBox onSubmit={handleChanged} defaultValue={query} />
        <Button variant="primary" onClick={handleClick}>
          Create note +
        </Button>
      </section>
      <section className="space-y-6">
        {isLoading && <p>Loading, please wait...</p>}
        {isError && <p>Something went wrong.</p>}
        {isSuccess && <NoteList notes={data.notes} onDelete={handleDeleteClick} />}
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={currentPage} setPage={setCurrentPage} />
        )}
      </section>
      {isModalOpen && (
        <Modal onClose={handleClose}>
          <NoteForm onSubmit={handleSubmit} onCancel={handleClose} />
        </Modal>
      )}
    </main>
  );
};

export default NotesClient;
