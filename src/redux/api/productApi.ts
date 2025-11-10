import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',                
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: builder => ({
    getProducts: builder.query<any[], void>({
      query: () => 'products',
      transformResponse: (response: any) => response.products,
    }),
  }),
});


export const { useGetProductsQuery } = productApi;
