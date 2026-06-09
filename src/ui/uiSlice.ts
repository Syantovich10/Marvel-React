import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type initialState = {
    selectedCharacter: number | string | null
}

const initialState: initialState = {
    selectedCharacter: null
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        changeSelectChar: (state, action: PayloadAction<number | string | null>) => {
            state.selectedCharacter = action.payload;
        }
    }
})

const {actions, reducer} = uiSlice;

export default reducer;

export const {changeSelectChar} = actions;