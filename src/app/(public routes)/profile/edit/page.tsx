import { Metadata } from 'next';
import Container from '@/components/Container/Container';

export const metadata: Metadata = {
  title: 'Edit Profile',
  description: 'Edit your profile information and settings.',
};

const EditProfile = () => {
  return (
    <Container>
      <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
        <h1>EditProfile Page</h1>
      </section>
    </Container>
  );
};

export default EditProfile;
