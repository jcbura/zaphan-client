import { baseQuery } from '@/api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const rootApi = createApi({ baseQuery, endpoints: () => ({}) });
