import { readCookie } from '../common/cookieHelper';

export default {
  success: (config) => {
    const auth = readCookie('auth') || null;

    if (auth != null) {
      const token = JSON.parse(auth).accessToken;
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error: err => Promise.reject(err),
};
