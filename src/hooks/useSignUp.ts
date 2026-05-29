'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '@/lib/services/authService';
import toast from 'react-hot-toast';

export const useSignUp = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signUp,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('User signed up successfully!', { icon: '✅' });
      router.push('/profile');
    },
    onError: error => {
      console.error('Failed to sign up:', error);
    },
  });
};
