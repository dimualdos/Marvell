import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _apiBase, _apiKey } from '../services/marvel-service';
import { IComics } from '../types/types';

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
            console.log(data);
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
            console.log(data);

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
            console.log(data);

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

interface ITaskReduser {
    charItems: any,
    charId: any,
    randomCharId: any,
    status: string,
    error: boolean | string
}

export const initialState: ITaskReduser = {
    charItems: [],
    charId: {},
    randomCharId: {},
    status: '',
    error: false
}

const marvelSliceReduser = createSlice({
    name: 'charItems',
    initialState,
    reducers: {
        // fetchMarvel(state, action) {
        //     state.charItems.push(action.payload);
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMarvel.pending, (state) => {
                state.status = 'loading';
                state.error = false;
            })
            .addCase(fetchMarvel.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.charItems.push(...action.payload);
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
    },
});

// const { addTodo } = marvelSliceReduser.actions;

export default marvelSliceReduser.reducer;
