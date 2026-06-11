import { configureStore } from '@reduxjs/toolkit';
import ui from "../ui/uiSlice"
import baseApi from "../api/baseApi";

const store = configureStore({
    reducer: {
        ui,
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
    devTools: import.meta.env.DEV
});

export type RootState = ReturnType<typeof store.getState>;
export type Store = typeof store;

export default store;