'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateNote } from '@/lib/services/noteService';
import { NoteDto } from '@/types/note';
import toast from 'react-hot-toast';

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNote,
    onSuccess: (updatedNote: NoteDto) => {
      queryClient.setQueryData(['note', updatedNote.id], updatedNote);
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note updated successfully');
    },

    onError: error => {
      console.error('Failed to update note:', error);
      toast.error('Failed to update note.', { icon: '❌' });
    },
  });
};
