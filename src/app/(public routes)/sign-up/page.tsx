'use client';

import { AuthRequest } from '@/types/auth';
import { useSignUp } from '@/hooks/useSignUp';
import { ApiError } from '@/lib/services/serverAPI';
import Container from '@/components/Container/Container';

const SignUp = () => {
  const signUpMutation = useSignUp();

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as AuthRequest;
      await signUpMutation.mutateAsync(formValues);
    } catch {
      // handled in mutation onError
    }
  };

  return (
    <Container>
      <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm flex flex-col items-center justify-between gap-3">
        <h1>Sign up</h1>
        <form action={handleSubmit}>
          <label>
            Email
            <input type="email" name="email" required />
          </label>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
          <button type="submit">Register</button>
        </form>
        {signUpMutation.isError && (
          <p className="text-red-500">
            {(signUpMutation.error as ApiError).response?.data?.error ??
              (signUpMutation.error as Error).message ??
              'Oops... some error'}
          </p>
        )}
      </section>
    </Container>
  );
};

export default SignUp;
