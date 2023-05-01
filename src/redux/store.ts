import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
<<<<<<< HEAD
import { setupListeners } from '@reduxjs/toolkit/query'
=======
>>>>>>> efe0860 (начало)
import { marvelApi } from './marvel-api';


export const store = configureStore({
    reducer: rootReducer,
<<<<<<< HEAD
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(marvelApi.middleware),
=======
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(marvelApi.middleware),
>>>>>>> efe0860 (начало)
});
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch