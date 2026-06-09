'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button/Button';
import Container from '@/components/Container/Container';
import { AuthRequest } from '../../../types/auth';
import { Eye, EyeOff } from 'lucide-react';
import { useSignIn } from '../../../hooks/useSignIn';
import { ApiError } from '@/types/api';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const id = useId();
  const signInMutation = useSignIn();

  const isFormEmpty = !email || !password;

  const handleSubmit = (formData: FormData) => {
    const formValues = Object.fromEntries(formData) as AuthRequest;
    signInMutation.mutate(formValues);
  };

  return (
    <Container className="flex flex-1 flex-col">
      <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm flex flex-col items-center gap-3 flex-1 mx-auto w-full max-w-md">
        <h1 className="text-4xl text-foreground dark:text-slate-200 font-bold text-center  mb-15">
          Sign in
        </h1>
        <form
          action={handleSubmit}
          className="flex flex-col flex-1 gap-10 w-full items-center justify-center"
        >
          <div className="flex flex-col w-full gap-8">
            <div className="flex flex-col w-full gap-2">
              <label htmlFor={`email-${id}`}>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                id={`email-${id}`}
                required
                placeholder="example@mail.com"
                autoComplete="email"
                className="h-10 w-full rounded-lg border border-slate-300 bg-surface-solid pl-2 pr-2 py-2 text-base text-foreground placeholder:text-slate-400 shadow-sm outline-none transition-colors hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:ring-blue-500 dark:hover:focus:ring-blue-500 dark:focus:ring-offset-slate-950"
                aria-label="Email"
              />
            </div>

            <div className="flex flex-col w-full gap-2 relative">
              <label htmlFor={`password-${id}`}>Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                id={`password-${id}`}
                required
                placeholder="••••••••"
                autoComplete="current-password"
                className="h-10 w-full rounded-lg border border-slate-300 bg-surface-solid pl-2 pr-10 py-2 text-base text-foreground placeholder:text-slate-400 shadow-sm outline-none transition-colors hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:ring-blue-500 dark:hover:focus:ring-blue-500 dark:focus:ring-offset-slate-950"
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[55%] inline-flex h-6 w-6 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-slate-800 dark:hover:text-slate-200 dark:focus-visible:ring-blue-400"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={isFormEmpty || signInMutation.isPending}
          >
            {signInMutation.isPending ? 'Logging in...' : 'Log in'}
          </Button>
        </form>
        <p className="text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <Link
            href="/sign-up"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign up
          </Link>
        </p>

        {signInMutation.isError && (
          <p className="text-red-500">
            {(signInMutation.error as ApiError).response?.data?.error ??
              (signInMutation.error as Error).message ??
              'Oops... some error'}
          </p>
        )}
      </section>
    </Container>
  );
};

export default SignIn;
