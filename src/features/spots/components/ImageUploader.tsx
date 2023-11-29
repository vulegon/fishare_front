import React, { useRef } from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Button from '@mui/material/Button';
import { SpotData } from '../types/SpotData';
import { v4 as uuidv4 } from 'uuid'; // uuid パッケージから v4 関数をインポート

function ImageUploader({
  setSpotData,
}: {
  setSpotData: React.Dispatch<React.SetStateAction<SpotData>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const newImage = { file: file, img: result, title: file.name, id: String(uuidv4()) };
        setSpotData((prev) => ({ ...prev, images: [...prev.images, newImage] }));
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
