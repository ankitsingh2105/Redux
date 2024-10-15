// Import React and Redux hooks
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import actions from the counter slice
import { increment, decrement, incrementByAmount } from './Slices/counterSlice';

const Counter2 = () => {
  // Access the current counter value from the Redux store
  const count = useSelector((state) => state.counter.value);

  return (
    <div>
      {/* Display the current counter value */}
      <h1> Counter 2 value should be changed : {count}</h1>
    </div>
  );
};

export default Counter2;
