'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/noteService';
import toast from 'react-hot-toast';

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,
    onSuccess: async (_data, id) => {
      queryClient.removeQueries({ queryKey: ['note', id] });
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note deleted successfully!', { icon: '✅' });
    },
    onError: error => {
      console.error('Failed to delete note:', error);
      toast.error('Failed to delete note.', { icon: '❌' });
    },
  });
};
