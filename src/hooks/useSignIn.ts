'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signIn } from '@/lib/services/authService';
import toast from 'react-hot-toast';

export const useSignIn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signIn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('User signed in successfully!', { icon: '✅' });
      router.push('/profile');
    },
    onError: error => {
      console.error('Failed to sign in:', error);
    },
  });
};
