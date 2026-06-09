import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {character, comic} from "../types/types";


const _transformCharacter = (char: any) => {
    const data = char.data ? char.data.results[0] : char;
    return {
        id: data.id,
        name: data.name,
        description: data.description ? `${data.description.slice(0, 210)}...` : 'There is no description for this character',
        thumbnail: data.thumbnail.path + '.' + data.thumbnail.extension,
        homepage: data.urls[0].url,
        wiki: data.urls[1].url,
        comics: data.comics.items
    }
}

const _transformComics =  (comic: any) => {
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


const _apiKey = "d4eecb0c66dedbfae4eab45d312fc1df"
const _baseUrl = "https://marvel-server-zeta.vercel.app/"

const heroesApi = createApi({
    reducerPath: "heroesApi",
    baseQuery: fetchBaseQuery({baseUrl: _baseUrl}),
    tagTypes: [],
    endpoints: builder => ({
        getAllCharacters: builder.query({
            query: (offset = 0) => `characters?limit=9&offset=${offset}&apikey=${_apiKey}`,
            transformResponse: (response: any) => response.data.results.map(_transformCharacter),
            // serializeQueryArgs: ({endpointName})=> endpointName,
            // merge: (currentCacheData, responseData) => [...currentCacheData, ...responseData],
        }),
        getCharacter: builder.query<character, number | string>({
            query: (id: number | string) => `characters/${id}?apikey=${_apiKey}`,
            transformResponse: (response: any) => _transformCharacter(response)
        }),
        getAllComics: builder.query<comic[], number | string>({
            query: (offset = 0) => `comics?limit=9&offset=${offset}&apikey=${_apiKey}`,
            transformResponse: (response: any) => response.data.results.map(_transformComics)
        }),
        getComic: builder.query({
            query: (id: number | string) => `comics/${id}?apikey=${_apiKey}`,
            transformResponse: (response: any) => _transformComics(response)
        })
    })
})

export const {
    useGetAllCharactersQuery,
    useLazyGetAllCharactersQuery,
    useGetCharacterQuery,
    useLazyGetCharacterQuery,
    useGetAllComicsQuery,
    useLazyGetAllComicsQuery,
    useGetComicQuery,
} = heroesApi;

export default heroesApi;