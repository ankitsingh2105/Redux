import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// todo : extrareducers actions
export const postTodo = createAsyncThunk("todos/addTodos", async (todo) => {
    const response = await axios.post("http://localhost:3000/addTask", todo);
    console.log("added some response");
    return response.data;
});

export const getAllTodos = createAsyncThunk("todos/getTodos", async () => {
    console.log("getting the todos");
    const response = await axios.get("http://localhost:3000/getTask");
    return response.data;
});

// todo :: making the slice
const todoSlice = createSlice({
    name: "asyncTodoList",
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {
        removeTodo: (state, action) => {
            const index = action.payload;
            state.tasks = state.tasks.filter((_, i) => i !== index);
        },
        addTodo: (state, action) => {
            state.tasks.push(action.payload);
            state.index += 1;
        },
    },
    // todo :: these are for async actions
    // * their counterParts are defined in the reducers 
    extraReducers: (builder) => {
        // * action.payload, action.error are predefined
        builder
            .addCase(getAllTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(getAllTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(postTodo.pending, (state) => {
                state.loading = true;
            })
            .addCase(postTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(postTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { removeTodo, addTodo } = todoSlice.actions;
export default todoSlice.reducer;
