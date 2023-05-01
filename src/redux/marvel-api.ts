import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IComics } from '../types/types';
import { _apiKey, _baseOffset } from '../services/marvel-service';

const _transformCharacter = (char: IComics) => {
  return {
    id: char.id,
    name: char.name,
    description: char.description ? `${char.description.slice(0, 210)}...` : 'На данного персонажа нет описания',
    thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
    homepage: char.urls[0].url,
    wiki: char.urls[1].url,
    comics: char.comics.items
  }
}

// Define a service using a base URL and expected endpoints
export const marvelApi = createApi({
  reducerPath: 'marvelApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://gateway.marvel.com:443/v1/public/' }),
  endpoints: (builder) => ({
    marvelGetAllComics: builder.query({
      query: () => `characters?limit=9&offset=${_baseOffset}&${'_apiKey'}`,
    }),
    marvelGetCharacterId: builder.query({
      query: (id: number) => `characters/${id}?${_apiKey}`
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useMarvelGetAllComicsQuery, useMarvelGetCharacterIdQuery } = marvelApi;