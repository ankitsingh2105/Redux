import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const postTodo = createAsyncThunk("todos/addTodos", async (todo) => {
    const response = await axios.post("http://localhost:3000/addTask", todo); // Send todo payload
    console.log("added some response");
    return response.data; // Return the added todo
});

export const getAllTodos = createAsyncThunk("todos/getTodos", async () => {
    console.log("getting the todos");
    const response = await axios.get("http://localhost:3000/getTask");
    return response.data; // Return the fetched todos
});

// making the slice
const todoSlice = createSlice({
    name: "asyncTodoList",
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {
        removeTodo: (state, action) => {
            const index = action.payload; // Get the index from the action payload
            state.tasks = state.tasks.filter((_, i) => i !== index); // Filter out the todo
        },
        addTodo: (state, action) => {
            state.tasks.push(action.payload); // Add the new todo to tasks array
            state.index += 1; // Increment the index
        },
    },
    extraReducers : (builder) => {
        builder
            .addCase(getAllTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(getAllTodos.rejected, (state, action) => {
                state.loading = false; // Set loading to false on error
                state.error = action.error.message; // Capture the error message
            })
            .addCase(postTodo.pending, (state) => {
                state.loading = true;
            })
            .addCase(postTodo.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload); // Add the newly created todo
            })
            .addCase(postTodo.rejected, (state, action) => {
                state.loading = false; // Set loading to false on error
                state.error = action.error.message; // Capture the error message
            });
    }
});

export const { removeTodo, addTodo } = todoSlice.actions; // Removed addTodo and getTodo actions
export default todoSlice.reducer;
