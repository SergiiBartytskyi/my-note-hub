'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/noteService';

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: error => {
      console.error('Failed to create note:', error);

      //ToDo: Show error toast to user
    },
  });
};
