import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import MarvelService from '../services/marvel-service';

const marvelService = new MarvelService();


export const fetchMarvel = createAsyncThunk(
    'tasks/fetchMarevel',
    async function (_, { rejectWithValue }) {
        try {
            const response = await marvelService.getAllCharacters();
            if (!response.ok) {
                throw new Error('Server Error!');
            }
            const data = await response.json();
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
    tasks: any,
    status: string,
    error: boolean | string
}

export const initialState: ITaskReduser = {
    tasks: [],
    status: '',
    error: false
}

const marvelSliceReduser = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action) {
            state.tasks.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMarvel.pending, (state) => {
                state.status = 'loading';
                state.error = false;
            })
            .addCase(fetchMarvel.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.tasks = action.payload;
            })
            .addCase(fetchMarvel.rejected, setError)
    },
});

// const { addTodo } = marvelSliceReduser.actions;

export default marvelSliceReduser.reducer;
