import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Test {
    language: string;
    counts: string;
}
const initialState: Test = {
    language: "",
    counts: "",
}
const testSlice = createSlice({
    name: "test",
    initialState,
    reducers: {
        update: (state, action: PayloadAction<Test>) => {
            state.counts = action.payload.counts;
            state.language = action.payload.language;
        },
    }
})
export const { update } = testSlice.actions;
export default testSlice.reducer;