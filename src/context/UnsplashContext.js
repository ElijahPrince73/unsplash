import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';

const unsplashContext = createContext({
  photos: [],
});

const useUnsplash = () => {
  const [loading, setLoading] = useState(false);
  const [photos,  setPhotos] = useState([])

  const getPhotos = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/search/photos`)

    setPhotos(data)
  }


  return {
    loading,
    getPhotos,
    photos,
  };
};

export function UnsplashProvider({ children }) {
  const unsplash = useUnsplash();

  return (
    <unsplashContext.Provider value={unsplash}>{children}</unsplashContext.Provider>
  );
}

export default function UsersConsumer() {
  return React.useContext(unsplashContext);
}

UnsplashProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
