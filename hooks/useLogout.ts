'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { logout } from '../lib/services/authService';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(['me'], null);
      queryClient.clear();
      toast.success('Logged out successfully', { icon: '👋' });
      window.location.href = '/';
    },
  });
};
