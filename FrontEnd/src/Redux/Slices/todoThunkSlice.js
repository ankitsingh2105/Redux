import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

// Async thunk to fetch todos from an API
export const fetchTodos = createAsyncThunk('tod67867os/fetchTodos', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos'); // Example API
    return response.data; // Return the fetched data
});

// Async thunk to add a new todo
export const addTodoAsync = createAsyncThunk('todos/addTodo', async (todo) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', todo); // Example API
    return response.data; // Return the created todo
});


const todoSlice = createSlice({
    name: "todoList",
    initialState: {
        tasks: [],
        index: 0,
        loading: false,
        error: null,
    },
    reducers: {
        // Synchronous addTodo action
        addTodo: (state, action) => {
            state.tasks.push(action.payload); // Add the new todo to tasks array
            state.index += 1; // Increment the index
        },
        removeTodo: (state, action) => {
            const index = action.payload; // Get the index from the action payload
            state.tasks = state.tasks.filter((_, i) => i !== index); // Filter out the todo
        },
    },
    extraReducers: (builder) => {
        builder
            // Extra reducers for async thunk fetchTodos
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true; // Set loading to true when fetching
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false; // Set loading to false when done
                state.tasks = action.payload; // Store the fetched todos
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false; // Set loading to false on error
                state.error = action.error.message; // Capture the error message
            })

            // Extra reducers for async thunk addTodoAsync
            .addCase(addTodoAsync.pending, (state) => {
                state.loading = true; // Set loading to true when adding a new todo
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.loading = false; // Set loading to false once the new todo is added
                state.tasks.push(action.payload); // Add the new todo to the tasks array
            })
            .addCase(addTodoAsync.rejected, (state, action) => {
                state.loading = false; // Set loading to false on error
                state.error = action.error.message; // Capture the error message
            });
    },
});

export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
