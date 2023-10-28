import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SearchOptionForm from './SearchOptionForm';
import { SearchOptions, SpotData } from './types/index';

function SearchSpot() {
  const [spotData, setSpotData] = useState<SpotData>({
    spotName: '',
    isSpotNameDisabled: false,
  });
  const [options, setOptions] = useState<SearchOptions>({
    isSearchOptionOpen: false,
    optionSpotName: '',
    isCatchableFishSelected: false,
    catchableFish: [],
    locations: [],
    fishingTypes: [],
    travelDistances: [],
  });

  const handleSearchSpotNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSpotData((prev) => ({
      ...prev,
      spotData: value,
    }));
  };

  const handleSearch = () => {
    // ここでAPIリクエストを実行する
    // 例: fetchData(spotName);
    // または、他の関数を呼び出してAPIリクエストを行う
    // 例: performAPISearch(spotName);
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
      <SearchOptionForm spotData={spotData} setSpotData={setSpotData} options={options} setOptions={setOptions} />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='釣り場を検索(今は使用できません)'
        inputProps={{ 'aria-label': 'search google maps' }}
        value={spotData.spotName}
        onChange={handleSearchSpotNameChange}
        disabled={spotData.isSpotNameDisabled}
      />
      <IconButton type='button' sx={{ p: '10px' }} aria-label='search' onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchSpot;
