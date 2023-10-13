import React, { useEffect, useState } from 'react';
import CheckBox from './CheckBox';
function FishingCheckBox({
  locations,
  fishingTypes,
  setFishingTypes,
}: {
  locations: string[];
  fishingTypes: string[];
  setFishingTypes: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [isDisabledSea, setIsDisabledSea] = useState<boolean>(true);
  const [isDisabledRiver, setIsDisabledRiver] = useState<boolean>(true);

  useEffect(() => {
    if (locations.includes('海釣り') && locations.includes('川釣り')) {
      setIsDisabledRiver(false);
      setIsDisabledSea(false);
    }
    if (locations.includes('海釣り')) {
      setIsDisabledSea(false);
    } else if (locations.includes('川釣り')) {
      setIsDisabledRiver(false);
    } else {
      setIsDisabledSea(true);
      setIsDisabledRiver(true);
    }
  }, [locations]);
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
        <CheckBox
          isDisabled={isDisabledSea}
          labels={['穴釣り', 'サビキ釣り', '投げ釣り']}
          checkedLabels={fishingTypes}
          setCheckedLabels={setFishingTypes}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
        <CheckBox
          isDisabled={isDisabledRiver}
          labels={['渓流釣り', 'バス釣り']}
          checkedLabels={fishingTypes}
          setCheckedLabels={setFishingTypes}
        />
      </div>
    </>
  );
}

export default FishingCheckBox;
