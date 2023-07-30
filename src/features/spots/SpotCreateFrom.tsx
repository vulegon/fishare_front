import React from 'react';
import { Amplify, I18n } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../../aws-exports';
import { translations } from '@aws-amplify/ui';
import Header from '../../Header';
import Typography from '@mui/material/Typography';
import SpotCreateFormMap from './SpotCreateFormMap';
I18n.putVocabularies(translations);
I18n.setLanguage('ja');
Amplify.configure(awsExports);

function SpotCreateFrom() {

  return (
    <div>
      <Header />
      <div style={{ marginTop: '40px', justifyContent: 'center' }}>
        <Typography variant='h4' gutterBottom>
          釣り場の登録
        </Typography>
        <SpotCreateFormMap/>
      </div>
    </div>
  );
}

export default withAuthenticator(SpotCreateFrom);
