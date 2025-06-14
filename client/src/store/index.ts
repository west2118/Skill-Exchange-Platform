import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postReducer from "./postSlice";
import exchangeReducer from "./exchangeSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    exchange: exchangeReducer,
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
