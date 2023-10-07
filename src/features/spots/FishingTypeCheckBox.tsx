import React from 'react';
import CheckBox from './CheckBox';
function FishingCheckBox({
  fishingType,
  setFishingType,
}: {
  fishingType: string[];
  setFishingType: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
        <CheckBox label={'穴釣り'} fishingType={fishingType} setFishingType={setFishingType} />
        <CheckBox label={'サビキ釣り'} fishingType={fishingType} setFishingType={setFishingType} />
        <CheckBox label={'投釣り'} fishingType={fishingType} setFishingType={setFishingType} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
        <CheckBox label={'渓流釣り'} fishingType={fishingType} setFishingType={setFishingType} />
        <CheckBox label={'バス釣り'} fishingType={fishingType} setFishingType={setFishingType} />
      </div>
    </>
  );
}

export default FishingCheckBox;
