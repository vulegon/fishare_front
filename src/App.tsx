import React, { createContext, useEffect, useState } from 'react';
import Map from './features/Map';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import SpotCreateFrom from './features/spots/SpotCreateFrom';
import SignUpForm from './features/auth/signUp/SignUpForm';
import SignInForm from './features/auth/signIn/SignInForm';
import SignUpSuccessForm from './features/auth/signUp/success/SignUpSuccessForm';
import { getCurrentUser } from './api/user';
import { CurrentUser } from './types/CurrentUser';
import { isUserLoggedIn } from './utils/authUtils';
export const CurrentUserContext = createContext(
  {} as {
    currentUser: CurrentUser;
    setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
  }
);
export const isCurrentUserLoadingCompleteContext = createContext(
  {} as {
    isCurrentUserLoadingComplete: boolean;
    setIsCurrentUserLoadingComplete: React.Dispatch<React.SetStateAction<boolean>>;
  }
);

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({ id: '', name: '', email: '' }); // ログインユーザー情報の初期値
  const [isCurrentUserLoadingComplete, setIsCurrentUserLoadingComplete] = useState<boolean>(false); // ログインユーザー情報の初期値
  const fetchCurrentUser = async () => {
    try {
      const response = await getCurrentUser();
      if (response === null) return;
      if (response.status !== 200) return;
      const data = await response.json();
      console.log(data);
      const is_login = data.is_login;
      if (is_login) {
        const userData = data.data;
        const currentUser = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
        };
        setCurrentUser(currentUser);
      }
    } catch (e) {
      console.log('エラー:', e);
    }
    setIsCurrentUserLoadingComplete(true);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [currentUser.id]);
  return (
    <Router>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <isCurrentUserLoadingCompleteContext.Provider value={{ isCurrentUserLoadingComplete, setIsCurrentUserLoadingComplete }}>
          <Routes>
            <Route path='/' element={<Map />} />
            <Route
              path='/spots'
              element={isUserLoggedIn(currentUser) ? <SpotCreateFrom /> : <Navigate to='/auth/sign_in' />}
            />
            <Route path='/auth/sign_up' element={<SignUpForm />} />
            <Route path='/auth/sign_in' element={<SignInForm />} />
            <Route path='/auth/sign_up/success' element={<SignUpSuccessForm />} />
          </Routes>
        </isCurrentUserLoadingCompleteContext.Provider>
      </CurrentUserContext.Provider>
    </Router>
  );
}

export default App;
