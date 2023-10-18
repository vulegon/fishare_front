import React, { useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
// import { SearchOptions } from './types';

export default function CheckBox({
  labels,
  // options,
  // setOptions,
  // target,
}: {
  labels: string[];
  // options: SearchOptions;
  // setOptions: React.Dispatch<React.SetStateAction<SearchOptions>>;
  // target: keyof SearchOptions;
  // isDisabled?: boolean;
}) {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, label: string) => {
    // if ((options[target] as string[]).includes(label)) {
    //   setOptions({
    //     ...options,
    //     [target]: (options[target] as string[]).filter((fishingType) => fishingType !== label),
    //   });
    // } else {
    //   setOptions({ ...options, [target]: label });
    // }
  };

  return (
    <>
      {labels.map((label) => (
        <FormControlLabel
          key={label}
          // checked={(options[target] as string[]).includes(label)}
          control={<Checkbox onChange={(e) => handleCheckboxChange(e, label)} />}
          label={label}
        />
      ))}
    </>
  );
}
