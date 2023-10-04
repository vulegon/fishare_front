import React from 'react'
import CheckBox from '../../components/CheckBox';
function FishingCheckBox() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
      <CheckBox label={'穴釣り'}></CheckBox>
      <CheckBox label={'サビキ釣り'} />
      <CheckBox label={'投釣り'} />
    </div>
  );
}

export default FishingCheckBox
