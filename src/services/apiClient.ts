import axios from 'axios';
import { ENV } from '../config';

export const apiClient = axios.create({
  baseURL: ENV.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
