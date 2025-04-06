'use client';

import Image from 'next/image';
import { useRef } from 'react';

export default function ImageUploader({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setFiles([...files, ...selected]);
  };

  const handleRemove = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        multiple
        ref={inputRef}
        onChange={handleSelect}
      />
      <div className="flex gap-2 flex-wrap">
        {files.map((file, idx) => (
          <div key={idx} className="relative">
            <Image
              src={URL.createObjectURL(file)}
              alt={`preview-${idx}`}
              width={96}
              height={96}
              className="rounded object-cover"
							unoptimized
            />
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
