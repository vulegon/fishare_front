import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Image } from '../../../types/Spot';
import { v4 as uuidv4 } from 'uuid'; // uuid パッケージから v4 関数をインポート


function SpotImages({ images }: { images: Image[] }) {
  return (
    <div style={{ marginLeft: '10px' }}>
      <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
        写真
      </Typography>
      <Box sx={{ height: 10 }}></Box>
      <ImageList sx={{ width: 500, height: 250 }} cols={3} rowHeight={200}>
        {images.map((image) => (
          <ImageListItem key={String(uuidv4())} sx={{ margin: '0 5px' }}>
            <img src={`${image.img}`} srcSet={`${image.img}`} alt={image.title} loading='lazy' />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default SpotImages;
