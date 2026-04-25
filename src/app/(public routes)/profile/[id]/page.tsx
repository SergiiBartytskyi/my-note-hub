import { notFound } from 'next/navigation';

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const user = null; // Placeholder for actual user data

  if (!user) {
    notFound();
  }

  return <div>{user}</div>;
}
