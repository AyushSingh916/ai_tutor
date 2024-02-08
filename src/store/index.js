import { configureStore } from "@reduxjs/toolkit";

import botReducer from './BotSlice';

const store = configureStore({
    reducer: botReducer,
});

export default store;