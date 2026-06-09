import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUpdateMe } from '@/hooks/useUpdateMe';
import Container from '../Container/Container';
import Button from '../Button/Button';
import { ArrowLeft } from 'lucide-react';
import AvatarPicker from '../AvatarPicker/AvatarPicker';
// import { uploadImage } from '@/lib/services/userService';

type ProfileEditFormProps = {
  initialEmail: string;
  initialUsername: string;
  initialAvatar: string;
};

const ProfileEditForm = ({
  initialEmail,
  initialUsername,
  initialAvatar,
}: ProfileEditFormProps) => {
  const router = useRouter();
  const updateMeMutation = useUpdateMe();

  const [email, setEmail] = useState(initialEmail);
  const [username, setUsername] = useState(initialUsername);
  const [avatar, setAvatar] = useState(initialAvatar);
  // const [imageFile, setImageFile] = useState<File | null>(null);

  const handleCancel = () => {
    router.replace('/profile');
  };

  const handleAvatarChange = (file: File | null) => {
    // setImageFile(file);

    if (!file) {
      setAvatar('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // let nextAvatar = avatar;

    // if (imageFile) {
    //   nextAvatar = await uploadImage(imageFile);
    // }

    await updateMeMutation.mutateAsync({
      email,
      username,
      // avatar: nextAvatar,
    });

    router.replace('/profile');
  };

  return (
    <Container>
      <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
        <Button variant="ghost" type="button" onClick={handleCancel} className="mb-4 gap-2">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Profile
        </Button>

        <h1 className="mb-4 text-xl font-semibold text-foreground">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <AvatarPicker profilePhotoUrl={avatar} onChangePhoto={handleAvatarChange} />

          {/* <label className="flex flex-col gap-2">
            <span className="text-sm text-muted">Email</span>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="rounded-xl border border-border bg-surface-solid px-4 py-2 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label> */}

          <label className="flex flex-col gap-2">
            <span className="text-sm text-muted">Username</span>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="rounded-xl border border-border bg-surface-solid px-4 py-2 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>

          {/* <label className="flex flex-col gap-2">
            <span className="text-sm text-muted">Avatar URL</span>
            <input
              type="text"
              value={avatar}
              onChange={e => {
                setAvatar(e.target.value);
                // setImageFile(null);
              }}
              className="rounded-xl border border-border bg-surface-solid px-4 py-2 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label> */}

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={updateMeMutation.isPending}>
              {updateMeMutation.isPending ? 'Saving...' : 'Save changes'}
            </Button>

            <Button type="button" variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </section>
    </Container>
  );
};

export default ProfileEditForm;
