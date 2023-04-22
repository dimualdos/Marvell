import { combineReducers } from "@reduxjs/toolkit";
import marvelSliceReduser from "./marvel-slice";

export const rootReducer = combineReducers({
    marvelDataCharacter: marvelSliceReduser,
});