import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import exchangeReducer from "./exchangeSlice";
import postReducer from "./postSlice";
import dealReducer from "./dealSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    exchange: exchangeReducer,
    post: postReducer,
    deal: dealReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
