import React from 'react';
import Map from './features/Map';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpotCreateFrom from './features/spots/SpotCreateFrom';
import SignUpForm from './features/users/SignUpForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Map />} />
        <Route path='/users/signup' element={<SignUpForm />} />
        <Route path='/spots' element={<SpotCreateFrom />} />
      </Routes>
    </Router>
  );
}

export default App;
