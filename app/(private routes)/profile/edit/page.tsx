import { Metadata } from 'next';
import ProfileEditClient from './ProfileEdit.client';

export const metadata: Metadata = {
  title: 'Edit Profile',
  description: 'Edit your profile information and settings.',
};

const ProfileEdit = () => {
  return <ProfileEditClient />;
};

export default ProfileEdit;
