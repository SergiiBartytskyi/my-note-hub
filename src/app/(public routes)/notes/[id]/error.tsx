'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import Container from '@/components/Container/Container';
import { ErrorProps } from '@/types/commonTypes';

const Error = ({ error }: ErrorProps) => {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container>
      <div className="py-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm dark:border-red-900 dark:bg-red-950/40">
          <p className="text-sm text-red-600 dark:text-red-400">Could not fetch note details.</p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Please try again.</p>

          <div className="mt-4">
            <Button variant="secondary" onClick={() => router.refresh()}>
              Try again
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Error;
