import { createSlice } from "@reduxjs/toolkit";
const getTheme = () => {
    return localStorage.getItem("theme") as "light" | "dark" || "light"
}
const themeSlice = createSlice({
    name: "theme",
    initialState: { mode: getTheme() as string },
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            localStorage.setItem("theme", state.mode);
        }
    }

});
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;