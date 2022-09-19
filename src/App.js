import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { UnsplashProvider } from './context/UnsplashContext'

import Photos from './pages/Photos';

const App = () => {
  return (
    <UnsplashProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Photos/>} />
        </Routes>
      </BrowserRouter>
    </UnsplashProvider>
  )
}

export default App