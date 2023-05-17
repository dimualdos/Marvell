import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { setupListeners } from '@reduxjs/toolkit/query'
import { marvelApi } from './marvel-api';


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(marvelApi.middleware),
});
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch