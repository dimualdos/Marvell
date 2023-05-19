import { combineReducers } from "@reduxjs/toolkit";
import marvelSliceReduser from "./marvel-slice";
import { marvelApi } from "./marvel-api";

export const rootReducer = combineReducers({
    marvelDataCharacter: marvelSliceReduser,
    [marvelApi.reducerPath]: marvelApi.reducer,
});