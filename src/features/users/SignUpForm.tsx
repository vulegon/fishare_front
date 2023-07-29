import React, { useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useNavigate } from 'react-router-dom';
import { withAuthenticator } from '@aws-amplify/ui-react';

function SignUpForm() {
  const navigate = useNavigate();
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  useEffect(() => {
    if (authStatus === 'authenticated') {
      navigate('/');
    }
  }, [authStatus, navigate]);
  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}></div>;
}

export default withAuthenticator(SignUpForm, { initialState: 'signUp' });
