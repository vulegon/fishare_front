import React, { useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CheckBox({
  disabled,
  labels,
  fishingTypes,
  setFishingTypes,
  location,
}: {
  disabled: boolean;
  labels: string[];
  fishingTypes: string[];
  setFishingTypes: React.Dispatch<React.SetStateAction<string[]>>;
  location: string;
}) {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, label: string) => {
    if (fishingTypes.includes(label)) {
      setFishingTypes(fishingTypes.filter((fishingType) => fishingType !== label));
    } else {
      setFishingTypes([...fishingTypes, label]);
    }
  };
  useEffect(() => {
    setFishingTypes([]);
  }, [location]);
  return (
    <>
      {labels.map((label) => (
        <FormControlLabel
          key={label}
          control={
            <Checkbox
              disabled={disabled}
              checked={fishingTypes.includes(label)}
              onChange={(e) => handleCheckboxChange(e, label)}
            />
          }
          label={label}
        />
      ))}
    </>
  );
}
