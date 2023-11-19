import React, { useState, useContext } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SearchOptionForm from './SearchOptionForm';
import { SearchOptions } from './types/index';
import { spotSearch } from '../../../api/spot';
import { SpotsDataContext } from '../../../contexts/spots/SpotsDataContext';

function SearchSpot() {
  const [options, setOptions] = useState<SearchOptions>({
    isSearchOptionOpen: false,
    optionSpotName: '',
    isCatchableFishSelected: false,
    catchableFish: [],
    locations: [],
    fishingTypes: [],
    travelDistances: [], //まだ未実装。ゆくゆくは現在位置から◯km圏内という検索条件を設定できるようにする
  });
  const { setSpotsData } = useContext(SpotsDataContext);
  const placeHolder = '釣り場を検索'

  const handleSearchSpotNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setOptions({
      ...options,
      optionSpotName: value,
    });
  };

  const onlySpotNameSearch = async () => {
    const response = await spotSearch({ spotName: options.optionSpotName });
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
      if (!options.isSearchOptionOpen) {
        response = await onlySpotNameSearch();
      }
      // 釣り場検索のオプションを使用しているとき
      else {
        response = await spotOpitonSearch();
      }

      if (response.status !== 200) return;
      const data = await response.json();
      setSpotsData(data.spots);
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
      <SearchOptionForm options={options} setOptions={setOptions} />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeHolder}
        inputProps={{ 'aria-label': 'search google maps' }}
        value={options.isSearchOptionOpen ? placeHolder : options.optionSpotName}
        onChange={handleSearchSpotNameChange}
        disabled={options.isSearchOptionOpen}
      />
      <IconButton type='button' sx={{ p: '10px' }} aria-label='search' onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchSpot;
