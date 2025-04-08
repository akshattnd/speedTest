import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/features/themeSlice"
import testReducer from "@/features/testSlice";
import authReducer from "@/features/authSlice";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    test: testReducer,
    auth: authReducer,
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
