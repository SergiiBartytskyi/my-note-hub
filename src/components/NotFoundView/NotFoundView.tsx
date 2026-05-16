'use client';

import Container from '@/components/Container/Container';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import { ArrowLeft } from 'lucide-react';

const NotFoundView = () => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.replace('/');
  };

  return (
    <Container className="flex flex-1">
      <section className="flex flex-1 flex-col items-center gap-3 w-full rounded-2xl border border-border bg-surface p-4 shadow-sm">
        <div className="flex w-full justify-start items-center">
          <Button variant="ghost" type="button" onClick={handleBack} className="mb-4 gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Home page
          </Button>
        </div>

        <div className="flex flex-1 flex-col gap-2 items-center justify-center ">
          <h1>404 - Page Not Found</h1>
          <p>Sorry, the page you&#39;re looking for doesn&#39;t exist.</p>
        </div>
      </section>
    </Container>
  );
};

export default NotFoundView;
