'use client';

import Container from '@/components/Container/Container';
import Link from 'next/link';
import { useMe } from '@/hooks/useMe';

const ProfileClient = () => {
  const { data: user, isPending, isError } = useMe();

  if (isPending) {
    return (
      <Container>
        <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm flex flex-col gap-3">
          <div className="h-7 w-32 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-5 w-48 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
          <div className="h-16 w-full rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
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

  return (
    <Container className="flex flex-col gap-4">
      <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm flex flex-col items-start justify-between gap-3">
        <h1>My Profile</h1>
        <h2>Name: {user.username}</h2>
        <p>{user.email}</p>
        <Link href="/profile/edit">Edit profile</Link>
      </section>
    </Container>
  );
};

export default ProfileClient;
