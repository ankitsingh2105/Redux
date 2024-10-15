// Import React and Redux hooks
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import actions from the counter slice
import { increment, decrement, incrementByAmount } from './Slices/counterSlice';

const Counter = () => {
  // Access the current counter value from the Redux store
  const count = useSelector((state) => state.counter.value);

  // Create a dispatch function to send actions to the Redux store
  const dispatch = useDispatch();

  return (
    <div>
      {/* Display the current counter value */}
      <h1>Counter: {count}</h1>
      
      {/* Dispatch actions when buttons are clicked */}
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
    </div>
  );
};

export default Counter;
