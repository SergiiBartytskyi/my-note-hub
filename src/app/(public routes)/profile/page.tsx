import Container from '@/components/Container/Container';
import { Link } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile page - NoteHub',
};

const Profile = () => {
  return (
    <>
      <Container className="flex flex-col gap-4">
        <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm flex flex-col items-start justify-between gap-3">
          <h1>My Profile</h1>
          <h2>Name: User name</h2>
          <p>
            Some description: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque non
            quis, vero consectetur eum at commodi facere error, laborum, rerum labore corrupti neque
            veritatis sed minima et nam. Autem, cumque.
          </p>

          <Link href="/profile/edit">Edit profile</Link>
        </section>
      </Container>
    </>
  );
};

export default Profile;
