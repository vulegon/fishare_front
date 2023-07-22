import React, { useEffect, useState } from 'react';
import { Amplify, Auth, I18n } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import awsExports from '../aws-exports';
import { translations } from '@aws-amplify/ui';
I18n.putVocabularies(translations);
I18n.setLanguage('ja');
Amplify.configure(awsExports);

export const useGetLoginUserName = (): string => {
  const [accountName, setAccountName] = useState<string>('ゲスト');

  useEffect(() => {
    getAccountName();
  }, []);

  const getAccountName = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setAccountName(user.username);
    } catch (error) {
      console.log('アカウント名の取得エラー:', error);
    }
  };

  return accountName;
};

export const useIsLogin = (): boolean => {
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

export const handleLogOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('ログアウトエラー:', error);
  }
};
