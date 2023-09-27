import React, { useRef } from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Button from '@mui/material/Button';
import { Image } from '../../types/types';

function ImageUploader({
  imageCount,
  setImageCount,
  images,
  setImages,
}: {
  imageCount: number;
  setImageCount: React.Dispatch<React.SetStateAction<number>>;
  images: Image[];
  setImages: React.Dispatch<React.SetStateAction<Image[]>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const newImage = { file: file, img: result, title: file.name, id: imageCount };
        setImages([...images, newImage]);
        setImageCount(imageCount + 1);
      };
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
      <input accept='image/*' id='icon-button-file' type='file' style={{ display: 'none' }} />
      <Button
        variant='outlined'
        style={{ borderRadius: 50, width: '80%', fontSize: 16 }}
        onClick={() => inputRef.current?.click()}
      >
        <input type='file' accept='image/*' style={{ display: 'none' }} ref={inputRef} onChange={handleFileSelect} />
        <AddAPhotoIcon style={{ marginRight: '8px' }} />
        写真を追加
      </Button>
    </div>
  );
}

export default ImageUploader;
