export const location = { latitude: 38.907192, longitude: -77.036873 };

export const OPENWEATHERKEY = 'c4571f37bc0379f63a3ef2b2fb06af87';

export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://api.whatowearexpress.twilightparadox.com'
    : 'http://localhost:3001';
