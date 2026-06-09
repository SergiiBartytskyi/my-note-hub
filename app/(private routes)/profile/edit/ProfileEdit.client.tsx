'use client';

import Container from '@/components/Container/Container';
import ProfileEditForm from '@/components/ProfileEditForm/ProfileEditForm';
import { useMe } from '@/hooks/useMe';

const ProfileEditClient = () => {
  const { data: user, isPending, isError } = useMe();

  if (isPending) {
    return (
      <Container>
        <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <p className="text-sm text-muted">Loading profile...</p>
        </section>
      </Container>
    );
  }

  if (isError || !user) {
    return (
      <Container>
        <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
          <p className="text-sm text-red-500">Failed to load profile.</p>
        </section>
      </Container>
    );
  }
  return (
    <ProfileEditForm
      key={user.email}
      initialEmail={user.email ?? ''}
      initialUsername={user.username ?? ''}
      initialAvatar={user.avatar ?? ''}
    />
  );
};

export default ProfileEditClient;
