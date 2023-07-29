import React, { useEffect } from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useNavigate } from 'react-router-dom';

function SignInForm() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Authenticator.Provider>
        <SignIn />
      </Authenticator.Provider>
    </div>
  );
}

const SignIn = () => {
  const navigate = useNavigate();
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  useEffect(() => {
    if (authStatus === 'authenticated') {
      navigate('/');
    }
  }, [authStatus, navigate]);
  return <Authenticator hideSignUp={true} loginMechanisms={['email']}/>;
};

export default SignInForm;
