import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CloseIcon from '@mui/icons-material/Close';
import { SpotData } from '../types/SpotData';

function SpotImageItem({
  spotData,
  setSpotData
}: {
  spotData: SpotData;
  setSpotData: React.Dispatch<React.SetStateAction<SpotData>>;
}) {
  const handleCloseIconClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const delete_image_id = parseInt(event.currentTarget.id);
    const result = spotData.images.filter((item) => item.id !== delete_image_id);
    setSpotData((prev)=>({...prev, images: result}));
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
      <ImageList sx={{ width: '100%', height: 500 }} cols={3} rowHeight={230}>
        {spotData.images.map((image) => (
          <ImageListItem key={image.img} sx={{ height: 250, width: 200 }}>
            <img
              src={`${image.img}`}
              srcSet={`${image.img}`}
              alt={image.title}
              loading='lazy'
              id={image.id.toString()}
              style={{ maxHeight: '100%', width: 'auto', objectFit: 'cover' }}
            />
            <CloseIcon
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 100,
                background: 'white',
                borderRadius: 50,
                cursor: 'pointer',
              }}
              onClick={handleCloseIconClick}
              id={image.id.toString()}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default SpotImageItem;
