import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _apiBase, _apiKey } from '../services/marvel-service';
import { IAllComicsList, IChar, IComics } from '../types/types';

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

const _transformComics = (comics: IAllComicsList) => {
    return {
        id: comics.id,
        title: comics.title,
        description: comics.description || "There is no description",
        pageCount: comics.pageCount
            ? `${comics.pageCount} p.`
            : "No information about the number of pages",
        thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
        language: comics.textObjects[0]?.language || "en-us",
        price: comics.prices[0].price
            ? `${comics.prices[0].price}$`
            : "not available",
    };
};

export const fetchMarvel = createAsyncThunk(
    'charItems/fetchMarvel',
    async function (offset: number, { rejectWithValue }) {
        try {
            const response = await fetch(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
            if (!response.ok) {
                throw new Error('Server Error!');
            }
            const res = await response.json();
            const data = res.data.results.map(_transformCharacter);
            // console.log(data);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchAllComics = createAsyncThunk(
    'charItems/fetchAllComics',
    async function (offset: number, { rejectWithValue }) {
        try {
            const response = await fetch(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
            if (!response.ok) {
                throw new Error('Server Error!');
            }
            const res = await response.json();
            const data = res.data.results.map(_transformComics);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCharacterId: any = createAsyncThunk(
    'charItems/fetchCharacterId',
    async function (id, { rejectWithValue }) {
        try {
            const response = await fetch(`${_apiBase}characters/${id}?${_apiKey}`);
            if (!response.ok) {
                throw new Error('Server Error!');
            }
            const res = await response.json();
            const data = res.data.results[0];
            // console.log(data);

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchRandomCharId: any = createAsyncThunk(
    'charItems/fetchRandomCharId',
    async function (id, { rejectWithValue }) {
        try {
            const response = await fetch(`${_apiBase}characters/${id}?${_apiKey}`);
            if (!response.ok) {
                throw new Error('Server Error!');
            }
            const res = await response.json();
            const data = res.data.results[0];
            // console.log(data);

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const setError = (state: { status: string; error: any; }, action: { payload: any; }) => {
    state.status = 'rejected';
    state.error = action.payload;
}

interface ICharReduser {
<<<<<<< HEAD
    charItemsData: IChar[],
    allComics: IComics[],
    charId: IChar,
    randomCharId: IChar,
=======
    charItems: any,
    charId: any,
    randomCharId: any,
>>>>>>> efe0860 (начало)
    status: string,
    error: boolean | string
}

export const initialState: ICharReduser = {
<<<<<<< HEAD
    charItemsData: [],
    allComics: [],
    charId: { urls: [] },
    randomCharId: { urls: [] },
=======
    charItems: [],
    charId: {},
    randomCharId: {},
>>>>>>> efe0860 (начало)
    status: '',
    error: false
}

const marvelSliceReduser = createSlice({
    name: 'charItems',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMarvel.pending, (state) => {
                state.status = 'loading';
                state.error = false;
            })
            .addCase(fetchMarvel.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.charItemsData.push(...action.payload);
            })
            .addCase(fetchMarvel.rejected, setError)

            .addCase(fetchCharacterId.pending, (state) => {
                state.status = 'loading';
                state.error = false;
            })
            .addCase(fetchCharacterId.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.charId = action.payload;
            })
            .addCase(fetchCharacterId.rejected, setError)

            .addCase(fetchRandomCharId.pending, (state) => {
                state.status = 'loading';
                state.error = false;
            })
            .addCase(fetchRandomCharId.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.randomCharId = action.payload;
            })
            .addCase(fetchRandomCharId.rejected, setError)
            .addCase(fetchAllComics.pending, (state) => {
                state.status = 'loading';
                state.error = false;
            })
            .addCase(fetchAllComics.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.allComics.push(...action.payload);
            })
            .addCase(fetchAllComics.rejected, setError)
    },
});

// const { addTodo } = marvelSliceReduser.actions;

export default marvelSliceReduser.reducer;
