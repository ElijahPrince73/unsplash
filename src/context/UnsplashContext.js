import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

import client from '../services/api';

const unsplashContext = createContext({
  photos: {},
});

const useUnsplash = () => {
  const [loading, setLoading] = useState(true);
  const [photos,  setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [photoDetails, setPhotoDetails] = useState({})

  const getPhotos = async (query, color, orientation) => {
    setLoading(true)

    const { data } = await client.get(`/search/photos?per_page=10&query=${query}${color ? `&color=${color}` : ''}${orientation ? `&orientation=${orientation}` : ''}`)

    setPhotos(data.results)
    setLoading(false)
  }

  const paginatePhotos = async (query, color, orientation) => {
    setLoading(true)
    const { data } = await client.get(`/search/photos?page=${page + 1}&per_page=10&query=${query}${color ? `&color=${color}` : ''}${orientation ? `&orientation=${orientation}` : ''}`)

    setPhotos([...photos, ...data.results])
    setPage(page + 1)
    setLoading(false)
  }

  const getPhotoDetails = async (photoId) => {
    setLoading(true)

    const { data } = await client.get(`/photos/${photoId}`)

    setLoading(false)
    setPhotoDetails(data)
  }


  return {
    loading,
    photos,
    photoDetails,
    getPhotos,
    getPhotoDetails,
    paginatePhotos,
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
