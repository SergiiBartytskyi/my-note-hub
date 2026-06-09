'use client';

import { useState } from 'react';
import Image from 'next/image';

type Props = {
  profilePhotoUrl?: string;
  onChangePhoto?: (file: File | null) => void;
};

const AvatarPicker = ({ profilePhotoUrl, onChangePhoto }: Props) => {
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
  const [isRemoved, setIsRemoved] = useState(false);
  const [error, setError] = useState('');

  const previewUrl = isRemoved ? '' : (localPreviewUrl ?? profilePhotoUrl ?? '');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Only images');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Max file size 5MB');
      return;
    }

    onChangePhoto?.(file);
    setIsRemoved(false);

    const reader = new FileReader();
    reader.onloadend = () => {
      setLocalPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onChangePhoto?.(null);
    setLocalPreviewUrl(null);
    setIsRemoved(true);
  };

  return (
    <div>
      <div className="relative w-75 h-75 flex items-center justify-center rounded-xl border border-white">
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Preview"
            width="300"
            height="300"
            className="w-full h-full rounded-xl"
            unoptimized
          />
        )}

        <label
          className={
            previewUrl
              ? 'absolute inset-0 z-9 flex cursor-pointer items-center justify-center opacity-0'
              : 'absolute inset-0 z-9 flex cursor-pointer items-center justify-center'
          }
        >
          📷 Choose photo
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>

        {previewUrl && (
          <button
            type="button"
            className="absolute right-2.5 top-2.5 z-10 bg-transparent cursor-pointer border-none"
            onClick={handleRemove}
          >
            ❌
          </button>
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default AvatarPicker;
