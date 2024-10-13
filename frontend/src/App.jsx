import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

import ImageGallery from './components/imageGallery/ImageGallery';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<ImageGallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
