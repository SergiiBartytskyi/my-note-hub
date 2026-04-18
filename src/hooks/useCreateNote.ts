'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/noteService';
import toast from 'react-hot-toast';

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note created successfully!', { icon: '✅' });
    },
    onError: error => {
      console.error('Failed to create note:', error);
      toast.error('Failed to create note.', { icon: '❌' });
    },
  });
};
