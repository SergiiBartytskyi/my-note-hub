'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMe } from '@/lib/services/userService';
import { User } from '@/types/auth';

export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMe,
    onSuccess: (updatedUser: User) => {
      queryClient.setQueryData(['me'], updatedUser);
    },
  });
};
