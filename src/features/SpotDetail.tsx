import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Spot } from '../types/types';

function SpotDetail({
  spotIsShow,
  setIsSpotShow,
  detailSpot,
}: {
  spotIsShow: boolean;
  setIsSpotShow: React.Dispatch<React.SetStateAction<boolean>>;
  detailSpot: Spot | null;
}) {
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsSpotShow(open);
  };

  useEffect(() => {
    console.log(detailSpot);
  }, []);

  return (
    <div>
      {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer open={spotIsShow} onClose={toggleDrawer(false)} BackdropProps={{ invisible: true }}>
            <Box
              sx={{ width: 500 }}
              role='presentation'
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            ></Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default SpotDetail;
