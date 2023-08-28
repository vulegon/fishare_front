import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Spot } from '../types/types';
import { getSpotShow } from '../services/apiClient';
import Typography from '@mui/material/Typography';

function SpotDetail({
  spotIsShow,
  setIsSpotShow,
  detailSpot,
}: {
  spotIsShow: boolean;
  setIsSpotShow: React.Dispatch<React.SetStateAction<boolean>>;
  detailSpot: Spot | null;
}) {
  const [spot, setSpot] = useState<null>(null);
  const [images, setImages] = useState<string[]>([]);

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
      const response = await getSpotShow(detailSpot.id);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setImages(data.images);
        setSpot(null);
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
              }}
              role='presentation'
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <Box sx={{ height: 100 }}></Box>
              <Typography variant='h5'>釣り場の名前</Typography>
              <Typography variant='h5'>釣れる魚</Typography>

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
