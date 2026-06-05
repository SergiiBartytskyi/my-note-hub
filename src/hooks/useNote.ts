'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/services/noteService';
import { useMe } from './useMe';

export const useNote = (id: string, enabled = true) => {
  const { data: user } = useMe();
  const isAuthenticated = !!user;

  return useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id) && enabled && isAuthenticated,
  });
};
