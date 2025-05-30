import fetchResponse from './fetch.js';
import { baseUrl } from './constants.js';

export const signUp = (user) => {
  return fetchResponse(baseUrl, 'signup', 'POST', user);
};

export const signIn = (user) => {
  return fetchResponse(baseUrl, 'signin', 'POST', user).then(
    ({ password, ...userData }) => userData
  );
};

export const getCurrentUser = (token) => {
  return fetchResponse(baseUrl, 'users/me', 'GET', undefined, token);
};

export const updateUserProfile = (userData, token) => {
  return fetchResponse(baseUrl, 'users/me', 'PATCH', userData, token);
};
