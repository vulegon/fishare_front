import React, { useState, useEffect, useRef } from 'react';
import { TextField } from '@mui/material';
import { Box } from '@mui/material';
import SearchSpotCheckBox from './SearchSpotCheckBox';
import TuneIcon from '@mui/icons-material/Tune';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CatchableFishInput from './CatchableFishInput';

function SearchOptionForm() {
  const [isSearchOptionOpen, setIsSearchOptionOpen] = useState<boolean>(false);
  const searchOptionRef = useRef<HTMLDivElement | null>(null);
  const [isCatchableFishSelected, setIsCatchableFishSelected] = useState<boolean>(false);
  const handleTuneClick = (event: React.MouseEvent) => {
    // イベントの伝播を止める
    event.stopPropagation();
    setIsSearchOptionOpen(!isSearchOptionOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (isCatchableFishSelected) {
      setIsCatchableFishSelected(false);

      return;
    }
    if (searchOptionRef.current && !searchOptionRef.current.contains(event.target as Node)) {
      setIsSearchOptionOpen(false);
    }
  };

  useEffect(() => {
    if (isSearchOptionOpen) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isSearchOptionOpen, isCatchableFishSelected]);

  return (
    <>
      <IconButton sx={{ p: '10px' }} aria-label='menu' onClick={handleTuneClick}>
        <TuneIcon />
      </IconButton>
      {isSearchOptionOpen && (
        <Paper
          elevation={3}
          style={{
            margin: '10px',
            padding: '20px',
            position: 'absolute',
            top: '40px',
            left: '0',
            zIndex: 100,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            width: '480px',
            display: 'flex',
            flexDirection: 'column',
          }}
          ref={searchOptionRef}
        >
          <TextField sx={{ width: '100%' }} id='spot-name-search' label='名前' type='search' variant='standard' />
          <Box sx={{ height: 10 }}></Box>
          <CatchableFishInput setIsCatchableFishSelected={setIsCatchableFishSelected} />
          <Box sx={{ height: 10 }}></Box>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
            <SearchSpotCheckBox label={'海釣り'} />
            <SearchSpotCheckBox label={'川釣り'} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
            <SearchSpotCheckBox label={'10km圏内'} />
            <SearchSpotCheckBox label={'県内'} />
            <SearchSpotCheckBox label={'指定なし'} />
          </div>
        </Paper>
      )}
    </>
  );
}

export default SearchOptionForm;
