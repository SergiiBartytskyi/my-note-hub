'use client';


import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '../lib/services/authService';
import toast from 'react-hot-toast';
import { ApiError } from '@/types/api';

export const useSignUp = () => {
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: signUp,
    onSuccess: data => {
      queryClient.setQueryData(['me'], data);
      toast.success('User signed up successfully!', { icon: '✅' });
  
      window.location.href = '/notes/filter/all';
    },
    onError: error => {
      toast.error(
        (error as ApiError).response?.data?.error ??
          (error as Error).message ??
          'Oops... some error'
      );
    },
  });
};
