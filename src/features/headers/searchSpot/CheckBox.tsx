import React, { useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CheckBox({
  labels,
  checkedLabels,
  setCheckedLabels,
  isDisabled = false,
}: {
  labels: string[];
  checkedLabels: string[];
  setCheckedLabels: React.Dispatch<React.SetStateAction<string[]>>;
  isDisabled?: boolean;
}) {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, label: string) => {
    if (checkedLabels.includes(label)) {
      setCheckedLabels(checkedLabels.filter((fishingType) => fishingType !== label));
    } else {
      setCheckedLabels([...checkedLabels, label]);
    }
  };

  return (
    <>
      {labels.map((label) => (
        <FormControlLabel
          key={label}
          disabled={isDisabled}
          checked={checkedLabels.includes(label)}
          control={<Checkbox onChange={(e) => handleCheckboxChange(e, label)} />}
          label={label}
        />
      ))}
    </>
  );
}
