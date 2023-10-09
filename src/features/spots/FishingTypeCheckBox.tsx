import React, { useEffect, useState } from 'react';
import CheckBox from './CheckBox';
function FishingCheckBox({
  location,
  fishingTypes,
  setFishingTypes,
}: {
  location: string;
  fishingTypes: string[];
  setFishingTypes: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [isSea, setIsSea] = useState<boolean>(false);
  const [isRiver, setIsRiver] = useState<boolean>(false);

  useEffect(() => {
    if (location === '海釣り') {
      setIsSea(true);
      setIsRiver(false);
    } else if (location === '川釣り') {
      setIsSea(false);
      setIsRiver(true);
    } else {
      setIsSea(false);
      setIsRiver(false);
    }
  }, [location]);
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
        <CheckBox
          disabled={isRiver}
          labels={['穴釣り', 'サビキ釣り', '投げ釣り']}
          fishingTypes={fishingTypes}
          setFishingTypes={setFishingTypes}
          location={location}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
        <CheckBox
          disabled={isSea}
          labels={['渓流釣り', 'バス釣り']}
          fishingTypes={fishingTypes}
          setFishingTypes={setFishingTypes}
          location={location}
        />
      </div>
    </>
  );
}

export default FishingCheckBox;
