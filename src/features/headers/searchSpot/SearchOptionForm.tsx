import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CatchableFishInput from './CatchableFishInput';
import CheckBox from './CheckBox';
import SpotNameInput from './SpotNameInput';
import { SearchOptions } from './types/index';

function SearchOptionForm({
  options,
  setOptions,
}: {
  options: SearchOptions;
  setOptions: React.Dispatch<React.SetStateAction<SearchOptions>>;
}) {
  const searchOptionRef = useRef<HTMLDivElement | null>(null);

  const handleTuneClick = (event: React.MouseEvent) => {
    // イベントの伝播を止める
    event.stopPropagation();
    setOptions((prevOptions) => ({
      ...prevOptions,
      isSearchOptionOpen: !options.isSearchOptionOpen,
    }));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (options.isCatchableFishSelected) {
      setOptions({ ...options, isCatchableFishSelected: false });
      return;
    }
    if (searchOptionRef.current && !searchOptionRef.current.contains(event.target as Node)) {
      setOptions({ ...options, isSearchOptionOpen: false });
    }
  };

  useEffect(() => {
    if (options.isSearchOptionOpen) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [options.isSearchOptionOpen, options.isCatchableFishSelected]);

  return (
    <>
      <IconButton sx={{ p: '10px' }} aria-label='menu' onClick={handleTuneClick}>
        <TuneIcon />
      </IconButton>
      {options.isSearchOptionOpen && (
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
          <SpotNameInput options={options} setOptions={setOptions} />
          <Box sx={{ height: 10 }} />
          <CatchableFishInput options={options} setOptions={setOptions} />
          <Box sx={{ height: 10 }} />
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
            <CheckBox labels={['海釣り', '川釣り']} options={options} setOptions={setOptions} target={'locations'} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
            <CheckBox
              labels={['穴釣り', 'サビキ釣り', '投げ釣り']}
              options={options}
              setOptions={setOptions}
              target={'fishingTypes'}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
            <CheckBox
              labels={['渓流釣り', 'バス釣り']}
              options={options}
              setOptions={setOptions}
              target={'fishingTypes'}
            />
          </div>
          {/* <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
            <CheckBox labels={['10km圏内']} options={options} setOptions={setOptions} target={'travelDistances'} />
          </div> */}
        </Paper>
      )}
    </>
  );
}

export default SearchOptionForm;
