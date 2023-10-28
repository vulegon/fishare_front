import React, { useEffect, useState } from 'react';
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
import { CurrentUserContext, IsCurrentUserLoadingCompleteContext } from './contexts/index';

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({ id: '', name: '', email: '' }); // ログインユーザー情報の初期値
  const [isCurrentUserLoadingComplete, setIsCurrentUserLoadingComplete] = useState<boolean>(false); //ログインユーザーの読み込みが終わったか
  const fetchCurrentUser = async () => {
    try {
      const response = await getCurrentUser();
      if (response === null) return setIsCurrentUserLoadingComplete(true);
      if (response.status !== 200) return setIsCurrentUserLoadingComplete(true);
      const data = await response.json();
      console.log(data);
      const user = data.user;
      if (user) {
        const currentUser = {
          id: user.id,
          name: user.name,
          email: user.email,
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
        <IsCurrentUserLoadingCompleteContext.Provider
          value={{ isCurrentUserLoadingComplete, setIsCurrentUserLoadingComplete }}
        >
          <Routes>
            <Route path='/' element={<Map />} />
            <Route
              path='/spots'
              element={
                isCurrentUserLoadingComplete ? (
                  isUserLoggedIn(currentUser) ? (
                    <SpotCreateFrom />
                  ) : (
                    <Navigate to='/auth/sign_in' />
                  )
                ) : null
              }
            />
            <Route path='/auth/sign_up' element={<SignUpForm />} />
            <Route path='/auth/sign_in' element={<SignInForm />} />
            <Route path='/auth/sign_up/success' element={<SignUpSuccessForm />} />
          </Routes>
        </IsCurrentUserLoadingCompleteContext.Provider>
      </CurrentUserContext.Provider>
    </Router>
  );
}

export default App;
