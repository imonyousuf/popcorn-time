/* eslint-disable no-undef */
import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDJhNDQxOGFkYTA3ZDcxOGFjZTFkMTMyMTdhOGVhMSIsInN1YiI6IjY1NTZiNWMxN2YwNTQwMDBmZjM2NjRhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uYFlqN8a4BHPjNOkl4MJl9nP-_Ag8aUdAN81B1ysDZ8`,
    },
});

export const getApiBaseUrl = () => {
    return api.defaults.baseURL;
};
