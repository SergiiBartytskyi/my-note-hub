'use client';

// import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signIn } from '../lib/services/authService';
import toast from 'react-hot-toast';
import { ApiError } from '@/types/api';

export const useSignIn = () => {
  const queryClient = useQueryClient();
  // const router = useRouter();

  return useMutation({
    mutationFn: signIn,
    onSuccess: data => {
      queryClient.setQueryData(['me'], data);
      toast.success('User signed in successfully!', { icon: '✅' });
      // router.refresh();
      // router.push('/notes/filter/all');
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
