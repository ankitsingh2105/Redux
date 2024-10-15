import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTodos, postTodo, addTodo } from './Slices/todoSlice'; // Adjusted import for postTodo
import { removeTodo } from './Slices/todoSlice';

const Todo = () => {
    const dispatch = useDispatch();
    const todo = useSelector((state) => state.todoList);
    const { tasks, error, loading } = todo; // Removed index as it's unused
    const [taskString, setTaskString] = useState("");

    useEffect(() => {
        // Fetch all todos when component mounts
        dispatch(getAllTodos());
    }, [dispatch]); // Adding dispatch to the dependency array

    const handleAdd = async () => {
        if (!taskString) return; // Prevent adding empty tasks
        try {
            dispatch(addTodo({ task: taskString }));
            await dispatch(postTodo({ task: taskString })).unwrap(); // Send the new todo
            setTaskString(""); // Clear input after successful addition
        } catch (error) {
            console.error("Failed to add todo: ", error);
        }
    };
    

    return (
        <>
            <center>
                <input 
                    value={taskString} // Controlled input
                    onChange={(e) => setTaskString(e.target.value)} 
                    type="text" 
                />
                <br />
                <br />
                <button onClick={handleAdd}>Add Todo</button>
            </center>
            <ul>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    tasks.map((task, i) => (
                        <div key={i}>{task.task}</div>
                    ))
                )}
                {error && <div>Error: {error}</div>} {/* Display error if it exists */}
            </ul>
        </>
    );
};

export default Todo;
