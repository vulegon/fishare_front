import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SearchOptionForm from './SearchOptionForm';

function SearchSpot() {
  const [spotName, setSpotName] = useState<string>('');
  const [isSpotNameDisabled, setIsSpotNameDisabled] = useState<boolean>(false);

  const handleSearchSpotNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpotName(event.target.value);
  };
  return (
    <Paper
      component='form'
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 500,
        borderRadius: '20px',
        position: 'relative',
      }}
    >
      <SearchOptionForm
        isSpotNameDisabled={isSpotNameDisabled}
        setIsSpotNameDisabled={setIsSpotNameDisabled}
        setSpotName={setSpotName}
      />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='釣り場を検索'
        inputProps={{ 'aria-label': 'search google maps' }}
        value={spotName}
        onChange={handleSearchSpotNameChange}
        disabled={isSpotNameDisabled}
      />
      <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchSpot;
