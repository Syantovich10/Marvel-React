import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const _baseUrl = "https://marvel-server-zeta.vercel.app/"

export const baseApi = createApi({
    reducerPath: "heroesApi",
    baseQuery: fetchBaseQuery({baseUrl: _baseUrl}),
    tagTypes: [],
    endpoints: builder => ({})
})

export default baseApi;