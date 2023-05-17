<<<<<<< HEAD
=======
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IComics, IComicsList } from '../types/types';
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

const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

// Define a service using a base URL and expected endpoints
export const marvelApi = createApi({
  reducerPath: 'marvelApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://gateway.marvel.com:443/v1/public/' }),
  endpoints: (builder) => ({
    marvelGetAllComics: builder.query<IComicsList, void>({
      query: () => `characters?limit=9&offset=${_baseOffset}&${_apiKey}`,
    }),
    marvelGetCharacterId: builder.query<IComics, number>({
      query: (id) => `characters/${id}?${_apiKey}`
    })
  }),
})
>>>>>>> 95ab0c8 (router V6)

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useMarvelGetAllComicsQuery, useMarvelGetCharacterIdQuery } = marvelApi;