import React, { useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SpotData } from '../types/SpotData';

export default function CheckBox({
  disabled,
  labels,
  spotData,
  setSpotData,
}: {
  disabled: boolean;
  labels: string[];
  spotData: SpotData;
  setSpotData: React.Dispatch<React.SetStateAction<SpotData>>;
}) {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, label: string) => {
    if (spotData.fishingTypes.includes(label)) {
      const newFishingTypes = spotData.fishingTypes.filter((fishingType) => fishingType !== label);
      setSpotData((prev) => ({ ...prev, fishingTypes: newFishingTypes }));
    } else {
      setSpotData((prev) => {
        const updatedFishingTypes = [...prev.fishingTypes, label];
        return { ...prev, fishingTypes: updatedFishingTypes };
      });
    }
  };
  useEffect(() => {
    const initializeFishingTypes = async () => {
      await setSpotData((prev) => ({ ...prev, fishingTypes: [] }));
    };

    initializeFishingTypes();
  }, [spotData.location]);
  return (
    <>
      {labels.map((label) => (
        <FormControlLabel
          key={label}
          control={
            <Checkbox
              disabled={disabled}
              checked={spotData.fishingTypes.includes(label)}
              onChange={(e) => handleCheckboxChange(e, label)}
            />
          }
          label={label}
        />
      ))}
    </>
  );
}
