'use client';

import Container from '@/components/Container/Container';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Profile page after 5 seconds
    const timer = setTimeout(() => {
      router.push('/profile');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Container>
        <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm flex flex-col items-center justify-between gap-3">
          <h1>404 - User Not Found</h1>
          <p>Sorry, the user you&#39;re looking for doesn&#39;t exist.</p>

          <p>You will be redirected to the Profile in a few seconds…</p>
        </section>
      </Container>
    </>
  );
};

export default NotFound;
