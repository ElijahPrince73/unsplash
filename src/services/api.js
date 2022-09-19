import axios from 'axios';

// Base axios instance
const client = axios.create({
  baseURL: `${process.env.REACT_APP_API}`,
});

// Allows us to se the Auth header before sending any request to server
client.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const newConfig = config;
    newConfig.headers.Authorization = `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`
    return newConfig;
  },
  (error) =>
    // Do something with request error
    Promise.reject(error)
);

export default client;
