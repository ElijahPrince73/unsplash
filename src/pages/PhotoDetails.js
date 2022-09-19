import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import useUnsplash from '../context/UnsplashContext'

const PhotoDetails = () => {
  const { photoId } = useParams()
  const { getPhotoDetails, photoDetails, loading } = useUnsplash()

  useEffect(() => {
    getPhotoDetails(photoId)
  }, [photoId])


  if(Object.keys(photoDetails).length === 0 || photoDetails === undefined && loading) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <div className="container lg:px-30 px-4 py-8 mx-auto">
      <a href="/" className="text-3xl mb-3 block">&#8592;</a>
      <div>
        <LazyLoadImage effect="opacity" src={photoDetails.urls.full} alt={photoDetails.alt_description} />
      </div>
      <div className="mt-6">
        <div className="flex">
          <img src={photoDetails.user.profile_image.small} alt="profile" className="rounded-full mr-3"/>
          <h3 className="text-black font-bold">{photoDetails.user.first_name} {photoDetails.user.last_name}</h3>
        </div>
        <div className="flex mt-3">
          <div className="mr-12">
            <p className="text-base font-semi-bold">Views</p>
            <p className="text-base font-semi-bold">{photoDetails.views}</p>
          </div>
          <div className="mr-12">
            <p className="text-base font-semi-bold">Likes</p>
            <p className="text-base font-semi-bold">{photoDetails.likes}</p>
          </div>
          <div className="">
            <p className="text-base font-semi-bold">Downloads</p>
            <p className="text-base font-semi-bold">{photoDetails.downloads}</p>
          </div>
        </div>
        <p className="mt-3">{photoDetails.alt_description}</p>
      </div>
    </div>
  )
}

export default PhotoDetails