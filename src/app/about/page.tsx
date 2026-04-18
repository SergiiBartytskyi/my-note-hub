import Container from '@/components/Container/Container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About page - NoteHub',
};

const About = () => {
  return (
    <>
      <Container>
        <section>About</section>
      </Container>
    </>
  );
};

export default About;
