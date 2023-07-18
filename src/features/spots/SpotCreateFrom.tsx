import React from 'react';
import { useEffect, useState } from 'react';
import { Amplify, Auth, I18n } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../../aws-exports';
import { translations } from '@aws-amplify/ui';
I18n.putVocabularies(translations);
I18n.setLanguage('ja');
Amplify.configure(awsExports);

function SpotCreateFrom() {
  const useCheckAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    return isAuthenticated;
  };

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      // ログアウト成功時の処理
    } catch (error) {
      console.log('ログアウトエラー:', error);
    }
  };
  const isAuthenticated = useCheckAuth();

  return (
    <div>
      {isAuthenticated ? (
        <p>
          ログイン済みです。
          <button onClick={handleSignOut}>ログアウト</button>
        </p>
      ) : (
        <p>ログインしていません。</p>
      )}
    </div>
  );
}

export default withAuthenticator(SpotCreateFrom);
