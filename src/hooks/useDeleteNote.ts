'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/noteService';

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,
    onSuccess: async (_data, id) => {
      queryClient.removeQueries({ queryKey: ['note', id] });
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: error => {
      console.error('Failed to delete note:', error);

      // ToDo: Show error toast to user
    },
  });
};
