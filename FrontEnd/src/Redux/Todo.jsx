import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTodos, postTodo, addTodo, removeTodo } from './Slices/todoSlice';

const Todo = () => {
    const dispatch = useDispatch();
    const todo = useSelector((state) => state.todoList);
    const { tasks, error, loading } = todo;
    const [taskString, setTaskString] = useState("");

    useEffect(() => {
        dispatch(getAllTodos());
    }, [dispatch]);

    const handleAdd = async () => {
        if (!taskString) return;
        try {
            dispatch(addTodo({ task: taskString }));
            await dispatch(postTodo({ task: taskString })).unwrap();
            setTaskString("");
        } catch (error) {
            console.error("Failed to add todo: ", error);
        }
    };


    return (
        <>
            <center>
                <input
                    value={taskString}
                    onChange={(e) => setTaskString(e.target.value)}
                    type="text"
                />
                <br />
                <br />
                <button onClick={handleAdd}>Add Todo</button>
            </center>
            <br />
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    tasks.map((task, i) => (
                        <center key={i}>{task.task}</center>
                    ))
                )}
                {error && <div>Error: {error}</div>}
            </div>
        </>
    );
};

export default Todo;
