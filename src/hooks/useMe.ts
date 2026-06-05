'use client';

import { getMe } from '@/lib/services/authService';
import { useQuery } from '@tanstack/react-query';

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    retry: false,
    staleTime: Infinity,
  });
};
