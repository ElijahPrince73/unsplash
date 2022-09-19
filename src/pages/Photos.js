import React,{ useState, useEffect, useRef, Fragment } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDebouncedCallback } from 'use-debounce';
import { Link } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'

import useUnsplash from '../context/UnsplashContext'

import SearchIcon from '../assets/search-icon.svg'

const Photos = () => {
  const scrollRef = useRef();
  const { getPhotos, paginatePhotos, photos, loading } = useUnsplash()
  const [searchValue, setSearchValue] = useState('');
  const [color, setColor] = useState('')
  const [orientation, setOrientation] = useState('')

  useEffect(() => {
    getPhotos()
  }, [])

  const onScroll = (e) => {
    // console.log(e.target.clientHeight, e.target.scrollHeight, e.target.scrollTop, e.target.scrollHeight - e.target.scrollTop)
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

      
    if (bottom) {
      paginatePhotos(searchValue, color, orientation)
    }
  };

  const debouncedPhotoSearch = useDebouncedCallback(
    (value) => {
      if (value) {
        getPhotos(value, color, orientation)
      } 
    },
    // delay in ms
    1000
  );

  const handleSearchChange = (e) => {
    const {
      target: { value },
    } = e;
    setSearchValue(value);
    debouncedPhotoSearch(value);
  };

  const handleOrientation = (orientation) => {
    if(orientation === 'Any orientation') {
      setOrientation('')
      getPhotos(searchValue, color, '')
    } else {
      setOrientation(orientation)
      getPhotos(searchValue, color, orientation)
    }
  }

  const handleColor = (color) => {
    if(color === 'Any color') {
      setColor('')
      getPhotos(searchValue, '', orientation)
    } else {
      setColor(color)
      getPhotos(searchValue, color, orientation)
    }
  }

  if(photos.length === 0 && loading) {
    return (
      <div>
        Loading
      </div>
    )
  }

  return (
    <div className="container lg:px-30 px-4 pt-8 mx-auto items-center">
      <div className="sticky text-gray-600 focus-within:text-gray-400 w-full mb-4 z-50">
        <div className="flex items-center">
          <div className="w-10/12 md:w-6/12 mr-6">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="submit"
                className="p-1 focus:outline-none focus:shadow-outline"
              >
                <img src={SearchIcon} alt="search icon" className="w-5" />
              </button>
            </span>
            <input
              className="py-3 text-base text-zinc-700 bg-zinc-300 focus:outline-none text-center w-full rounded-full"
              placeholder="Search"
              onChange={handleSearchChange}
              onClick={() => setSearchValue('')}
              value={searchValue}
            />
          </div>
          <div className="relative">
          <Menu>
            <Menu.Button className="mr-3 text-black">{orientation ? orientation : 'Any orientation'} &#9660;</Menu.Button>
            <Transition
              appear as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute -left-16 md:left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    <p className="cursor-pointer text-black hover:bg-gray-100" onClick={() => handleOrientation('Any orientation')}>Any orientation</p>
                  </Menu.Item>
                  <Menu.Item>
                    <p className="cursor-pointer text-black hover:bg-gray-100" onClick={() => handleOrientation('landscape')}>Landscape</p>
                  </Menu.Item>
                  <Menu.Item>
                    <p className="cursor-pointer text-black hover:bg-gray-100" onClick={() => handleOrientation('portrait')}>Portrait</p>
                  </Menu.Item>
                  <Menu.Item>
                    <p className="cursor-pointer text-black hover:bg-gray-100" onClick={() => handleOrientation('squarish')}>Square</p>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <Menu>
            <Menu.Button className="text-black">{color ? color : 'Any color'} &#9660;</Menu.Button>
            <Transition
              appear as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute -left-16 md:left-8 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    <p className="cursor-pointer text-black hover:bg-gray-100" onClick={() => handleColor('Any color')}>Any color</p>
                  </Menu.Item>
                  <Menu.Item>
                    <p className="cursor-pointer text-black hover:bg-gray-100 mt-2" onClick={() => handleColor('black_and_white')}>Black and White</p>
                  </Menu.Item>
                  <Menu.Item>
                    <p className="cursor-pointer text-black hover:bg-gray-100 mt-2" onClick={() => handleColor('black')}>Tone</p>
                  </Menu.Item>
                  <Menu.Item>
                    <div className="flex justify-between mt-2">
                      <p className="cursor-pointer text-black w-4 h-4 border border-zinc-200 rounded-full bg-black" onClick={() => handleColor('black')}></p>
                      <p className="cursor-pointer text-black w-4 h-4 border border-zinc-200 rounded-full bg-white" onClick={() => handleColor('white')}></p>
                      <p className="cursor-pointer text-black w-4 h-4 border border-zinc-200 rounded-full bg-yellow-300" onClick={() => handleColor('yellow')}></p>
                      <p className="cursor-pointer text-black w-4 h-4 border border-zinc-200 rounded-full bg-orange-700" onClick={() => handleColor('orange')}></p>
                      <p className="cursor-pointer text-black w-4 h-4 border border-zinc-200 rounded-full bg-red-700" onClick={() => handleColor('red')}></p>
                      <p className="cursor-pointer text-black w-4 h-4 border border-zinc-200 rounded-full bg-purple-700" onClick={() => handleColor('purple')}></p>
                      <p className="cursor-pointer text-black w-4 h-4 border border-zinc-200 rounded-full bg-fuchsia-700" onClick={() => handleColor('fuchsia')}></p>
                      <p className="cursor-pointer text-black w-4 h-4 border border-zinc-200 rounded-full bg-green-700" onClick={() => handleColor('green')}></p>
                      <p className="cursor-pointer text-black w-4 h-4 border border-zinc-200 rounded-full bg-teal-500" onClick={() => handleColor('teal')}></p>
                      <p className="cursor-pointer text-black w-4 h-4 border border-zinc-200 rounded-full bg-blue-700" onClick={() => handleColor('blue')}></p>
                    </div>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
            {/* 
            <select className="mr-3 text-zinc-700 bg-zinc-300 w-full rounded-full px-4">
              <option>Black and White</option>
              <option>Landscape</option>
              <option>Portrait</option>
              <option>Square</option>
            </select> */}
          </div>
        </div>
      </div>
      <div className="no-scrollbar" style={{ height: 'calc(100vh - 1px)', overflowY: 'scroll' }} onScroll={onScroll} ref={scrollRef}>
        <div className="columns-1 md:columns-2 lg:columns-3">
          {photos.map(({ id, urls }) => {  
            return (
              <Link to={`/photos/${id}`} key={id} className="mb-4">
                <LazyLoadImage
                  alt="unsplash"
                  src={urls.regular}
                  effect="opacity"
                  className="cursor-pointer"
                />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Photos