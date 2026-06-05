import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { serverGetMe } from '@/lib/services/serverAuthService';
import ProfileClient from './Profile.client';

export const metadata: Metadata = {
  title: 'Profile page',
  robots: {
    index: false,
    follow: true,
  },
};

const Profile = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['me'],
    queryFn: serverGetMe,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileClient />
    </HydrationBoundary>
  );
};

export default Profile;
