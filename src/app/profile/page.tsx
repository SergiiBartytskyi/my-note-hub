import Container from '@/components/Container/Container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile page - NoteHub',
};

const Profile = () => {
  return (
    <>
      <Container>
        <section>Profile</section>
      </Container>
    </>
  );
};

export default Profile;
