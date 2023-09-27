import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Spot } from '../types/types';
import { getSpotShow } from '../api/client';
import Typography from '@mui/material/Typography';
import defaultSpotImage from './default-spot-image.png';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function SpotDetail({
  spotIsShow,
  setIsSpotShow,
  detailSpot,
}: {
  spotIsShow: boolean;
  setIsSpotShow: React.Dispatch<React.SetStateAction<boolean>>;
  detailSpot: Spot | null;
}) {
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isEnable, setIsEnable] = useState<boolean>(false);
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsSpotShow(open);
  };

  const fetchSpotShow = async () => {
    if (detailSpot === null) {
      console.log('detailSpotはnullです');
      return;
    }
    try {
      const userId = '123'; //後で修正する
      const response = await getSpotShow(detailSpot.id, userId);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setName(data.name);
        setImages(data.images);
        setDescription(data.description);
        setIsEnable(data.is_enable);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchSpotShow();
  }, []);

  return (
    <div>
      {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer open={spotIsShow} onClose={toggleDrawer(false)} BackdropProps={{ invisible: true }}>
            <Box
              sx={{
                width: 500,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
              role='presentation'
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <img src={defaultSpotImage} alt='default_spot_image' style={{ width: '100%' }} />
              <div style={{ position: 'absolute', top: 0, right: 20 }}>
                <Fab color='primary' aria-label='edit'>
                  <EditIcon />
                </Fab>
                <Fab color='primary' aria-label='delete'>
                  <DeleteIcon />
                </Fab>
              </div>

              <Box sx={{ height: 20 }}></Box>
              <Typography variant='h4'>{name}</Typography>
              <Box sx={{ height: 20 }}></Box>
              <Typography variant='h5'>{description}</Typography>
              <Box sx={{ height: 20 }}></Box>
              <Typography variant='h5'>写真</Typography>
              {images.map((image) => (
                <img key={image} src={image} alt='spot_image' />
              ))}
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default SpotDetail;
