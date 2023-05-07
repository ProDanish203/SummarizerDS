import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const RapidApiKey = import.meta.env.VITE_RAPID_API_KEY;
const RapidApiKey = "610dd1061dmshb3526e88258c147p1e2682jsn5aea63236f4e";

export const articleApi = createApi({
    reducerPath: "articleApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', RapidApiKey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com')

            return headers
        }
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        })
    })
})

export const { useLazyGetSummaryQuery } = articleApi;