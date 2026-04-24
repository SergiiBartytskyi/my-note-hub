'use client';

import Container from '@/components/Container/Container';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page after 5 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Container>
        <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm flex flex-col items-center justify-between gap-3">
          <h1>404 - Page Not Found</h1>
          <p>Sorry, the page you&#39;re looking for doesn&#39;t exist.</p>

          <p>You will be redirected to the homepage in a few seconds…</p>
          {/* <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-300 dark:hover:text-blue-400"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Go back home
          </Link> */}
        </section>
      </Container>
    </>
  );
};

export default NotFound;
