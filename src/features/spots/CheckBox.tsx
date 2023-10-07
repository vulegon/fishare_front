import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CheckBox({
  label,
  fishingType,
  setFishingType,
}: {
  label: string;
  fishingType: string[];
  setFishingType: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (fishingType.includes(label)) {
      setFishingType(fishingType.filter((check) => check !== label));
    } else {
      setFishingType([...fishingType, label]);
    }
  };
  return (
    <>
      <FormControlLabel control={<Checkbox onChange={handleCheckboxChange} />} label={label} />
    </>
  );
}
