import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { UnsplashProvider } from './context/UnsplashContext'

import Photos from './pages/Photos';
import PhotoDetails from './pages/PhotoDetails';

const App = () => {
  return (
    <UnsplashProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Photos/>} />
          <Route path='/photos/:photoId' element={<PhotoDetails />} />
        </Routes>
      </BrowserRouter>
    </UnsplashProvider>
  )
}

export default App