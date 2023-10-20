import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Spot } from '../types/Spot';
import { getSpotShow } from '../api/spot';
import Typography from '@mui/material/Typography';
import defaultSpotImage from './default-spot-image.png';
import EditDeleteIcons from './EditDeleteIcons';
import { Divider } from '@mui/material';
import Chip from '@mui/material/Chip';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Margin from './Margin';

function SpotDetail({
  spotIsShow,
  setIsSpotShow,
  detailSpot,
}: {
  spotIsShow: boolean;
  setIsSpotShow: React.Dispatch<React.SetStateAction<boolean>>;
  detailSpot: Spot | null;
}) {
  const [isEnable, setIsEnable] = useState<boolean>(false);
  interface DetailSpot {
    name: string;
    description: string;
    fish: string[];
    fishing_types: string[];
    images: string[];
    location: string;
  }
  const [spot, setSpot] = useState<DetailSpot>({
    name: '',
    description: '',
    fish: [],
    fishing_types: [],
    images: [],
    location: '',
  });

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
        setSpot({
          ...spot,
          name: data.name,
          description: data.description,
          location: data.location,
          fish: data.fish,
          fishing_types: data.fishing_types,
          images: data.images,
        });

        setIsEnable(data.editable);
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
                position: 'relative',
              }}
              role='presentation'
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <img src={defaultSpotImage} alt='default_spot_image' style={{ width: '100%', height: 250 }} />
              {isEnable && <EditDeleteIcons />}
              <Margin />
              <div style={{ marginLeft: '10px' }}>
                <Typography variant='h5' gutterBottom sx={{ fontWeight: 600, marginBottom: 0 }}>
                  {spot.name}
                </Typography>
              </div>
              <Margin />
              <Divider />
              <Margin />
              <div style={{ marginLeft: '10px' }}>
                <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
                  説明
                </Typography>
                <Typography variant='button' display='block' gutterBottom sx={{ color: 'grey' }}>
                  {spot.description}
                </Typography>
              </div>
              <Margin />
              <Divider />
              <Margin />
              <div style={{ marginLeft: '10px' }}>
                <Typography variant='subtitle2' gutterBottom sx={{ fontWeight: 600 }}>
                  釣れる魚
                </Typography>
                {spot.fish.map((fish_name) => (
                  <Chip key={fish_name} color='primary' label={fish_name}></Chip>
                ))}
              </div>
              <Margin />
              <Divider />
              <Margin />
              <div style={{ marginLeft: '10px' }}>
                <Typography variant='subtitle2' gutterBottom sx={{ fontWeight: 600 }}>
                  釣りの種類
                </Typography>
                {spot.fishing_types.map((fishing_type) => (
                  <Chip key={fishing_type} color='primary' label={fishing_type}></Chip>
                ))}
              </div>
              <Margin />
              <Divider />
              <Margin />
              <div style={{ marginLeft: '10px' }}>
                <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
                  写真
                </Typography>
                <Box sx={{ height: 10 }}></Box>
                <ImageList sx={{ width: 500, height: 250 }} cols={3} rowHeight={200}>
                  {spot.images.map((item) => (
                    <ImageListItem key={item} sx={{ margin: '0 5px' }}>
                      <img src={item} alt={item} loading='lazy' />
                    </ImageListItem>
                  ))}
                </ImageList>
              </div>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default SpotDetail;
