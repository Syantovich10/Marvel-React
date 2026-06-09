import { configureStore } from '@reduxjs/toolkit';
import ui from "../ui/uiSlice"
import heroesApi from "../api/heroesApi";

const store = configureStore({
    reducer: {
        ui,
        [heroesApi.reducerPath]: heroesApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(heroesApi.middleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type Store = typeof store;

export default store;