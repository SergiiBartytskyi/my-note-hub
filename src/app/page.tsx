import Container from '@/components/Container/Container';

export default function Home() {
  return (
    <Container>
      <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm flex flex-col items-center justify-between gap-3">
        <h1 className="text-4xl text-foreground dark:text-slate-200 font-bold text-center  mb-15">
          Welcome to NoteHub
        </h1>
        <p className="text-[18px] text-foreground dark:text-slate-200 leading-7 mb-4">
          NoteHub is a simple and efficient application designed for managing personal notes. It
          helps keep your thoughts organized and accessible in one place, whether you are at home or
          on the go
        </p>
        <p className="text-[18px] text-foreground dark:text-slate-200 leading-7 mb-4">
          The app provides a clean interface for writing, editing, and browsing notes. With support
          for keyword search and structured organization, NoteHub offers a streamlined experience
          for anyone who values clarity and productivity.
        </p>
      </section>
    </Container>
  );
}
