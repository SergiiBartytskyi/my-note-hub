import Container from '@/components/Container/Container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About page - NoteHub',
};

const About = () => {
  return (
    <>
      <Container>
        <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm flex flex-col items-start justify-between gap-3">
          About
        </section>
      </Container>
    </>
  );
};

export default About;
