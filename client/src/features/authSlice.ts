
import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Auth {
    login: boolean;
    user: User | null
}
const initialState: Auth = {
    login: false,
    user: null,

}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.login = true;
        },
        logout: (state) => {
            state.login = false;
            state.user = null;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        }
    },
})
export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;