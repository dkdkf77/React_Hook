import React, { useState, useRef } from 'react';

function UseRef() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  console.log(countRef); // Ref 안에 값으로 접근하고 싶으면 countRef.current

  const increaseCountState = () => {
    setCount(count + 1);
  };
  const increaseCountRef = () => {
    countRef.current = countRef.current + 1;
    console.log('Ref : ', countRef.current);
  };

  return (
    <div>
      <p>State : {count}</p>
      <p>Ref: {countRef.current}</p>
      <button onClick={increaseCountState}>State 올려</button>
      <button onClick={increaseCountRef}>Ref 올려</button>
    </div>
  );
}

export default UseRef;
