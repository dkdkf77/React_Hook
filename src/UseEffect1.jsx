import React, { useState, useEffect } from 'react';

function Count() {
  const [count, setCount] = useState(1);
  // count는 초기값으로 1을 가지게 된다
  // onClick 시 handleCountUpdate가 작동되며 count + 1을 해준다
  const [name, setName] = useState('');

  const handleCountUpdate = () => {
    setCount(count + 1);
  };
  // 마운트 + [item] 이 바뀔때 렌더링
  // useEffect(() => {
  //   //...
  //   console.log('count 값만 변화하였을때 렌더링');
  // }, [count]);

  // count만 변경 되었을때 useEffect를 실행시키고 싶다면?
  // useEffect에 두번째 인자에 배열을 넣으주는데 배열 값을 [count]로 넣어주면 된다 => dependency array
  // 만약 name 값만 변화 하였을때 콜백 함수를 불러오고 싶다? 두번째 인자 값에  [count]를 넣어주면 된다

  // 렌더링마다 매번 실행됌 -렌더링 이후
  useEffect(() => {
    console.log('렌더링 👍');
  });

  // 마운팅 + count가 변화할때마다 실행됨
  useEffect(() => {
    console.log('[count]=count update만 출력');
  }, [count]);

  // 마운팅 + name이 변화할때마다 실행됨
  useEffect(() => {
    console.log('[name]= name update만 출력');
  }, [name]);

  // 첫 마운팅 만 콜백
  useEffect(() => {
    console.log('[] = 첫 마운팅 때만 출력⁉️');
  }, []);

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  // input tag가 바뀌면 초기값 name = '' 에서 바뀐 값이 setName에 의해 value를 받게 되고 span에 넣어 지게 된다
  // input 안에 값을 change 할때 마다 name state가 바뀌게 되고 계속 렌더링 되게 된다 useEffect 안의 콜백이 계속 불리게 된다

  return (
    <div>
      <button onClick={handleCountUpdate}>Update</button>
      <br />
      <span>count: {count}</span>
      <br />
      <br />
      <br />
      <input type="text" value={name} onChange={handleInputChange} />
      <br />
      <span>name : {name}</span>
    </div>
  );
}

export default Count;
