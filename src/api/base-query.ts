import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const baseQuery = fetchBaseQuery({ baseUrl: API_URL });
