import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
<<<<<<< HEAD
<<<<<<< HEAD
import { setupListeners } from '@reduxjs/toolkit/query'
=======
>>>>>>> efe0860 (начало)
=======
import { setupListeners } from '@reduxjs/toolkit/query'
>>>>>>> 95ab0c8 (router V6)
import { marvelApi } from './marvel-api';


export const store = configureStore({
    reducer: rootReducer,
<<<<<<< HEAD
<<<<<<< HEAD
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(marvelApi.middleware),
=======
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(marvelApi.middleware),
>>>>>>> efe0860 (начало)
=======
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(marvelApi.middleware),
>>>>>>> 95ab0c8 (router V6)
});
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch