import React, { createContext, useState } from 'react';
import Map from './features/Map';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import SpotCreateFrom from './features/spots/SpotCreateFrom';
import SignUpForm from './features/auth/signUp/SignUpForm';
import SignInForm from './features/auth/signIn/SignInForm';
import SignUpSuccessForm from './features/auth/signUp/success/SignUpSuccessForm';

interface CurrentUser {
  id: string;
  name: string;
  email: string;
}
export const CurrentUserContext = createContext(
  {} as {
    currentUser: CurrentUser;
    setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
  }
);

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({ id: '', name: '', email: '' }); // ログインユーザー情報の初期値
  const isUserLoggedIn = () => {
    // currentUserが空でなければログイン済みとみなす
    return !!currentUser.id;
  };
  return (
    <Router>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Routes>
          <Route path='/' element={<Map />} />
          <Route path='/spots' element={isUserLoggedIn() ? <SpotCreateFrom /> : <Navigate to='/auth/sign_in' />} />
          <Route path='/auth/sign_up' element={<SignUpForm />} />
          <Route path='/auth/sign_in' element={<SignInForm />} />
          <Route path='/auth/sign_up/success' element={<SignUpSuccessForm />} />
        </Routes>
      </CurrentUserContext.Provider>
    </Router>
  );
}

export default App;
