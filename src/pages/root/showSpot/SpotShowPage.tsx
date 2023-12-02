import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Spot } from '../../../types/Spot';
import { getSpotShow } from '../../../api/spot';
import defaultSpotImage from '../../../features/root/showSpot/default-spot-image.png';
import EditDeleteIcons from '../../../features/root/showSpot/EditDeleteIcons';
import { HeightMargin, SpaceWithDivider } from '../../../features/root/showSpot/components';
import { ShowSpot } from '../../../types/ShowSpot';
import {
  SpotName,
  SpotDescription,
  SpotLocation,
  SpotCatchableFish,
  SpotFishingType,
  SpotImages,
} from '../../../features/root/showSpot';

function SpotShow({
  spotIsShow,
  setIsSpotShow,
  showSpot,
}: {
  spotIsShow: boolean;
  setIsSpotShow: React.Dispatch<React.SetStateAction<boolean>>;
  showSpot: Spot | null;
}) {
  const [spot, setSpot] = useState<ShowSpot>({
    id: '',
    name: '',
    description: '',
    latitude: 0,
    longitude: 0,
    fish: [],
    fishing_types: [],
    images: [],
    location: '',
    editable: false,
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
    if (showSpot === null) {
      console.log('detailSpotはnullです');
      return;
    }
    try {
      const response = await getSpotShow(showSpot.id);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        const responseSpot = data.spot;
        setSpot({
          ...spot,
          id: responseSpot.id,
          name: responseSpot.name,
          description: responseSpot.description,
          location: responseSpot.location,
          fish: responseSpot.fish,
          fishing_types: responseSpot.fishing_types,
          images: responseSpot.images,
          editable: responseSpot.editable,
        });
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
              {spot.editable && <EditDeleteIcons id={spot.id} />}
              <HeightMargin />
              <SpotName spotName={spot.name} />
              <SpaceWithDivider />
              <SpotDescription spotDescription={spot.description} />
              <SpaceWithDivider />
              <SpotLocation spotLocation={spot.location} />
              <SpaceWithDivider />
              <SpotCatchableFish catchableFish={spot.fish} />
              <SpaceWithDivider />
              <SpotFishingType fishingTypes={spot.fishing_types} />
              <SpaceWithDivider />
              <SpotImages images={spot.images} />
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default SpotShow;
