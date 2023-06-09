import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialTodoState = {
    isLoading: false,
    data: [],
    isError: false
}

export const getTodo = createAsyncThunk("getTodo", async (name, thunkAPI) => {
    try {
        const response = await axios("https://jsonplaceholder.typicode.com/todos")
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue("something went wrong");
    }

})

const todoSlice = createSlice({
    name: "todo",
    initialState: initialTodoState,
    extraReducers: (builder) => {
        builder.addCase(getTodo.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getTodo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(getTodo.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.data = [];
        });
    }
})

export default todoSlice.reducer;