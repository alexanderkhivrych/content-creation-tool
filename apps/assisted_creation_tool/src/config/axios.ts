import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://picsum.photos/',
});

export { axiosInstance };
