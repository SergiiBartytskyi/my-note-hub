import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'View your profile information and settings.',
};
interface ProfileProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProfilePage({ params }: ProfileProps) {
  const { id } = await params;
  console.log('ProfilePage id:', id);

  const user = null; // Placeholder for actual user data

  if (!user) {
    notFound();
  }

  return <div>{user}</div>;
}
