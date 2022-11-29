import React, { useState, useRef } from 'react';

function UseRefDiff() {
  const [renderer, setRenderer] = useState(0);
  const countRef = useRef(0);
  let countVar = 0;

  const doRendering = () => {
    setRenderer(renderer + 1);
  };

  const increaseRef = () => {
    countRef.current = countRef.current + 1;
    console.log('ref : ', countRef.current);
  };

  const increaseVar = () => {
    countVar = countVar + 1;
    console.log('var : ', countVar);
  };

  const printResults = () => {
    console.log(`ref: ${countRef.current}, var : ${countVar}`);
    // 함수가 불리면 현재 ref 안에 있는 값과 var에 있는 값을 출력해주는 함수
  };

  return (
    <div>
      <p>Ref: {countRef.current}</p>
      <p>Var: {countVar}</p>
      <button onClick={doRendering}>렌더링</button>
      <button onClick={increaseRef}>Ref 올려</button>
      <button onClick={increaseVar}>변수 올려</button>
      <button onClick={printResults}>Ref Var 값 출력</button>
    </div>
  );
}

export default UseRefDiff;
