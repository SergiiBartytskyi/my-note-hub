'use client';

import Button from '@/components/Button/Button';
import Container from '@/components/Container/Container';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.replace('/notes/filter/all');
  };

  return (
    <Container className="flex flex-1">
      <section className="flex flex-1 flex-col items-center gap-3 w-full rounded-2xl border border-border bg-surface p-4 shadow-sm ">
        <div className="flex w-full justify-start items-center">
          <Button variant="ghost" type="button" onClick={handleBack} className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Notes
          </Button>
        </div>

        <div className="flex flex-1 flex-col gap-2 items-center justify-center ">
          <h1>404 - Note Not Found</h1>
          <p>Sorry, the note you&#39;re looking for doesn&#39;t exist.</p>
        </div>
      </section>
    </Container>
  );
};

export default NotFound;
