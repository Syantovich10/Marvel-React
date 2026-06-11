import {baseApi} from './baseApi';
import type {character} from "../types/types";

const _transformCharacter = (char: any): character => {
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

const _apiKey = "d4eecb0c66dedbfae4eab45d312fc1df"

export const characterApi = baseApi.injectEndpoints({
    endpoints: builder => ({
        getAllCharacters: builder.query<character[], number | string | undefined>({
            query: (offset = 0) => `characters?limit=9&offset=${offset}&apikey=${_apiKey}`,
            transformResponse: (response: any) => response.data.results.map(_transformCharacter),
            serializeQueryArgs: ({ endpointName }) => endpointName,
            merge: (currentCacheData, responseData) => {
                currentCacheData.push(...responseData);
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            },
        }),
        getCharacter: builder.query<character, number | string>({
            query: (id: number | string) => `characters/${id}?apikey=${_apiKey}`,
            transformResponse: (response: any) => _transformCharacter(response)
        }),
    })
})

export const {
    useGetAllCharactersQuery,
    useLazyGetAllCharactersQuery,
    useGetCharacterQuery,
    useLazyGetCharacterQuery,
} = characterApi;