import React, { useEffect, useState } from 'react';
import CheckBox from './CheckBox';
import { SpotData } from '../types/SpotData';
function FishingCheckBox({
  spotData,
  setSpotData,
}: {
  spotData: SpotData;
  setSpotData: React.Dispatch<React.SetStateAction<SpotData>>;
}) {
  const [isSea, setIsSea] = useState<boolean>(false);
  const [isRiver, setIsRiver] = useState<boolean>(false);

  useEffect(() => {
    if (spotData.location === '海釣り') {
      setIsSea(true);
      setIsRiver(false);
    } else if (spotData.location === '川釣り') {
      setIsSea(false);
      setIsRiver(true);
    } else {
      setIsSea(false);
      setIsRiver(false);
    }
  }, [spotData.location]);
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
        <CheckBox
          disabled={isRiver}
          labels={['穴釣り', 'サビキ釣り', '投げ釣り']}
          spotData={spotData}
          setSpotData={setSpotData}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
        <CheckBox disabled={isSea} labels={['渓流釣り', 'バス釣り']} spotData={spotData} setSpotData={setSpotData} />
      </div>
    </>
  );
}

export default FishingCheckBox;
