import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type initialState = {
    selectedCharacter: number | string | null,
    comicsOffset: number,
    charsOffset: number
}

const initialState: initialState = {
    selectedCharacter: null,
    comicsOffset: 0,
    charsOffset: 0
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        changeSelectChar: (state, action: PayloadAction<number | string | null>) => {
            state.selectedCharacter = action.payload;
        },
        changeComicsOffset: (state) => {
            state.comicsOffset = state.comicsOffset + 9;
        },
        changeCharsOffset: (state) => {
            state.charsOffset = state.charsOffset + 9;
        }
    }
})

const {actions, reducer} = uiSlice;

export default reducer;

export const {changeSelectChar, changeComicsOffset, changeCharsOffset} = actions;