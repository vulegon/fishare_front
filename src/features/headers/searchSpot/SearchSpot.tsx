import React, { useState, useContext } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SearchOptionForm from './SearchOptionForm';
import { SearchOptions, SpotData } from './types/index';
import { spotSearch } from '../../../api/spot';
import { SpotsContext } from '../../../contexts/spots/SpotsContext';

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
  const { spots, setSpots } = useContext(SpotsContext);

  const handleSearchSpotNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSpotData((prev) => ({
      ...prev,
      spotData: value,
    }));
  };

  const onlySpotNameSearch = async () => {
    const response = await spotSearch({ spotName: spotData.spotName });
    return response;
  };

  const spotOpitonSearch = async () => {
    const response = await spotSearch({
      spotName: options.optionSpotName,
      catchableFish: options.catchableFish,
      locations: options.locations,
      fishingTypes: options.fishingTypes,
      travelDistances: options.travelDistances,
    });
    return response;
  };

  const handleSearch = async () => {
    try {
      let response;
      // 釣り場検索のオプションを使用していないとき
      if (!spotData.isSpotNameDisabled && !options.isSearchOptionOpen) {
        response = await onlySpotNameSearch();
      }
      // 釣り場検索のオプションを使用しているとき
      else {
        response = await spotOpitonSearch();
      }

      if (response.status !== 200) return;
      const data = await response.json();
      setSpots(data.spots);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
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
        placeholder='釣り場を検索'
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
