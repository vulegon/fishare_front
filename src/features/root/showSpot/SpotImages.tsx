import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
function SpotImages({ images }: { images: string[] }) {
  return (
    <div style={{ marginLeft: '10px' }}>
      <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
        写真
      </Typography>
      <Box sx={{ height: 10 }}></Box>
      <ImageList sx={{ width: 500, height: 250 }} cols={3} rowHeight={200}>
        {images.map((item) => (
          <ImageListItem key={item} sx={{ margin: '0 5px' }}>
            <img src={item} alt={item} loading='lazy' />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default SpotImages;
