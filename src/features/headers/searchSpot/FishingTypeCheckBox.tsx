import React, { useEffect, useState } from 'react';
import CheckBox from './CheckBox';
function FishingTypeCheckBox({
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
  const FISHING_TYPES = {
    海釣り: ['穴釣り', 'サビキ釣り', '投げ釣り'],
    川釣り: ['渓流釣り', 'バス釣り'],
  };

  useEffect(() => {
    const isSeaEnabled = locations.includes('海釣り');
    const isRiverEnabled = locations.includes('川釣り');

    const setDisabled = ({ sea, river }: { sea: boolean; river: boolean }) => {
      setIsDisabledSea(sea);
      setIsDisabledRiver(river);
    };

    if (isSeaEnabled && isRiverEnabled) {
      setDisabled({ sea: false, river: false });
      const allFishingTypes = FISHING_TYPES['海釣り'].concat(FISHING_TYPES['川釣り']);
      setFishingTypes(allFishingTypes);

    } else if (isSeaEnabled) {
      setDisabled({ sea: false, river: true });
      setFishingTypes(FISHING_TYPES['海釣り']);
    } else if (isRiverEnabled) {
      setDisabled({ sea: true, river: false });
      setFishingTypes(FISHING_TYPES['川釣り']);
      
    } else {
      setDisabled({ sea: true, river: true });
      setFishingTypes([]);
    }
  }, [locations]);
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
        {/* <CheckBox
          isDisabled={isDisabledSea}
          labels={FISHING_TYPES['海釣り']}
          checkedLabels={fishingTypes}
          setCheckedLabels={setFishingTypes}
        /> */}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
        {/* <CheckBox
          isDisabled={isDisabledRiver}
          labels={FISHING_TYPES['川釣り']}
          checkedLabels={fishingTypes}
          setCheckedLabels={setFishingTypes}
        /> */}
      </div>
    </>
  );
}

export default FishingTypeCheckBox;
