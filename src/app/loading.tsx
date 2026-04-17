import Container from '@/components/Container/Container';

const Loading = () => {
  return (
    <main className="flex-1 py-6">
      <Container>
        <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <p className="text-sm text-slate-600 dark:text-slate-300">Loading, please wait...</p>
        </section>
      </Container>
    </main>
  );
};

export default Loading;
