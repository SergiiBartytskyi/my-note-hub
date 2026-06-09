'use client';

import Container from '@/components/Container/Container';
import { useMe } from '../../../hooks/useMe';
import EditLink from '@/components/EditLink/EditLink';
import Image from 'next/image';

const ProfileClient = () => {
  const { data: user, isPending, isError } = useMe();

  if (isPending) {
    return (
      <Container>
        <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm flex flex-col gap-3">
          <div className="h-24 w-24 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-7 w-32 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-5 w-48 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-10 w-32 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
        </section>
      </Container>
    );
  }

  if (isError || !user) {
    return (
      <Container>
        <p className="text-sm text-red-600 dark:text-red-400">Failed to load profile.</p>
      </Container>
    );
  }

  const initial = user.username?.charAt(0).toUpperCase() || 'U';

  return (
    <Container className="flex flex-col gap-4">
      <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm flex flex-col items-start gap-4">
        <h1>My Profile</h1>

        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={`${user.username}'s profile photo`}
            width={96}
            height={96}
            className="h-24 w-24 rounded-full object-cover border border-border"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-border bg-surface-solid text-2xl font-semibold text-foreground">
            {initial}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <h2>Name: {user.username}</h2>
          <p>{user.email}</p>
        </div>

        <EditLink href="/profile/edit">Edit Profile</EditLink>
      </section>
    </Container>
  );
};

export default ProfileClient;
