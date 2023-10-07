import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CheckBox({
  label,
  fishingTypes,
  setFishingTypes,
}: {
  label: string;
  fishingTypes: string[];
  setFishingTypes: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (fishingTypes.includes(label)) {
      setFishingTypes(fishingTypes.filter((fishingType) => fishingType !== label));
    } else {
      setFishingTypes([...fishingTypes, label]);
    }
  };
  return <FormControlLabel control={<Checkbox onChange={handleCheckboxChange} />} label={label} />;
}
