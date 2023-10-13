import React, { useState, useEffect, useRef } from 'react';
import { TextField } from '@mui/material';
import { Box } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CatchableFishInput from './CatchableFishInput';
import CheckBox from './CheckBox';
import FishingCheckBox from './FishingTypeCheckBox';

function SearchOptionForm({
  isSpotNameDisabled,
  setIsSpotNameDisabled,
  setSpotName,
}: {
  isSpotNameDisabled: boolean;
  setIsSpotNameDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setSpotName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isSearchOptionOpen, setIsSearchOptionOpen] = useState<boolean>(false);
  const searchOptionRef = useRef<HTMLDivElement | null>(null);
  const [isCatchableFishSelected, setIsCatchableFishSelected] = useState<boolean>(false);
  const [optionSpotName, setOptionSpotName] = useState<string>('');
  const [catchableFish, setCatchableFish] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [fishingTypes, setFishingTypes] = useState<string[]>([]);
  const [travelDistances, setTravelDistances] = useState<string[]>([]);

  const handleTuneClick = (event: React.MouseEvent) => {
    // イベントの伝播を止める
    event.stopPropagation();
    setIsSearchOptionOpen(!isSearchOptionOpen);
    //釣り場を検索する部分の文字を空にする、入力できないようにする
    setIsSpotNameDisabled(!isSpotNameDisabled);
    setSpotName('');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (isCatchableFishSelected) {
      setIsCatchableFishSelected(false);

      return;
    }
    if (searchOptionRef.current && !searchOptionRef.current.contains(event.target as Node)) {
      setIsSearchOptionOpen(false);
      setIsSpotNameDisabled(!isSpotNameDisabled);
      setSpotName('');
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
            <CheckBox
              labels={['海釣り', '川釣り']}
              checkedLabels={locations}
              setCheckedLabels={setLocations}
            />
          </div>
          <FishingCheckBox
            locations={locations}
            fishingTypes={fishingTypes}
            setFishingTypes={setFishingTypes}
          ></FishingCheckBox>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
            <CheckBox
              labels={['10km圏内']}
              checkedLabels={travelDistances}
              setCheckedLabels={setTravelDistances}
            />
          </div>
        </Paper>
      )}
    </>
  );
}

export default SearchOptionForm;
