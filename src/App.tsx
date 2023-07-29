import React from 'react';
import Map from './features/Map';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpotCreateFrom from './features/spots/CreateFrom';
import SignUpForm from './features/users/SignUpForm';
import SignInForm from './features/users/SignInForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Map />} />
        <Route path='/spots' element={<SpotCreateFrom />} />
        <Route path='/users/sign_up' element={<SignUpForm />} />
        <Route path='/users/sign_in' element={<SignInForm />} />
      </Routes>
    </Router>
  );
}

export default App;
