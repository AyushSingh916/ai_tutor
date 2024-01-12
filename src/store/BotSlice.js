import { createSlice } from "@reduxjs/toolkit";

const botSlice = createSlice({
    name: 'bot',
    initialState: {botNumber: 1},
    reducers: {
        change(state, action) {
            state.botNumber = action.payload;
        }
    }
});

export const botActions = botSlice.actions;

export default botSlice.reducer;