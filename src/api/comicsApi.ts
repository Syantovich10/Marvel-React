import {baseApi} from "./baseApi"
import type {comic} from "../types/types";

const _apiKey = "d4eecb0c66dedbfae4eab45d312fc1df"

const _transformComics =  (comic: any): comic => {
    const data = comic.data ? comic.data.results[0] : comic;
    return {
        id: data.id,
        title: data.title,
        description: data.description ? `${data.description.slice(0, 210)}...` : 'There is no description for this character',
        thumbnail: data.thumbnail.path + '.' + data.thumbnail.extension,
        pageCount: data.pageCount,
        price: data.prices[0].price,
        languages: data.textObjects.languages,
    }
}

export const comicsApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getAllComics: builder.query<comic[], number | string | undefined>({
            query: (offset = 0) => `comics?limit=9&offset=${offset}&apikey=${_apiKey}`,
            transformResponse: (response: any) => response.data.results.map(_transformComics),
            serializeQueryArgs: ({ endpointName }) => endpointName,
            merge: (currentCacheData, responseData) => {
                currentCacheData.push(...responseData);
            },
            forceRefetch({ currentArg, previousArg }) {
                if((currentArg === 0) && (previousArg !== 0)) {
                    return false
                }
                return currentArg !== previousArg;
            },
        }),
        getComic: builder.query<comic, number | string>({
            query: (id: number | string) => `comics/${id}?apikey=${_apiKey}`,
            transformResponse: (response: any) => _transformComics(response)
        })
    })
})

export const {
    useGetAllComicsQuery,
    useLazyGetAllComicsQuery,
    useGetComicQuery,
} = comicsApi;