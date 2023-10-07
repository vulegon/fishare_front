import React from 'react';
import CheckBox from './CheckBox';
function FishingCheckBox({
  fishingTypes,
  setFishingTypes,
}: {
  fishingTypes: string[];
  setFishingTypes: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
        <CheckBox label={'穴釣り'} fishingTypes={fishingTypes} setFishingTypes={setFishingTypes} />
        <CheckBox label={'サビキ釣り'} fishingTypes={fishingTypes} setFishingTypes={setFishingTypes} />
        <CheckBox label={'投釣り'} fishingTypes={fishingTypes} setFishingTypes={setFishingTypes} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
        <CheckBox label={'渓流釣り'} fishingTypes={fishingTypes} setFishingTypes={setFishingTypes} />
        <CheckBox label={'バス釣り'} fishingTypes={fishingTypes} setFishingTypes={setFishingTypes} />
      </div>
    </>
  );
}

export default FishingCheckBox;
