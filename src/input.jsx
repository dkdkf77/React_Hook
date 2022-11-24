import React, { useState } from 'react';

const heavyWork = () => {
  console.log('엄청 무거운 작업!!');
  return ['홍길동', '김민수'];
};

function Input() {
  // heavyWork 값을 초기값으로 넣어 주니 계속 불려와서 비효율 적으로 된다
  // 이것을 방지 하기 위해서는 콜백 함수를 사용해서 불러주면 처음 랜더링 할때만 불러오고 다른 작업시에는 불러오지 않는다
  const [names, setNames] = useState(() => {
    return heavyWork();
  });
  // 현재 input 안에 무슨값이 들어 가있는지 트랙킹해주는 state
  const [input, setInput] = useState('');
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleUpload = () => {
    // setNames()안에 바로 값을 주는게 아니라 콜백 함수를 줄것이다
    setNames((PrevState) => {
      console.log('이전 state: ', PrevState);
      return [input, ...PrevState];
    });
  };

  return (
    <div>
      <input type="text" value={input} onChange={handleInputChange} />
      {/* value 값을 ''을 준다 */}
      {/* 사용자가 input 값에 입력하면 핸들링해주는 값 onChange */}
      <button onClick={handleUpload}>Upload</button>
      {names.map((name, idx) => {
        return <p key={idx}>{name}</p>;
      })}
      {/* 리액트에서 map을 써서 앨리먼트를 출력하려면 key 값이 꼭 필요 하다 */}
      {/* names를 돌려서 현재 적용되어 있는 홍길동과 김민수를 name에 넣어 p태그 안에 넣어 준다 */}
    </div>
  );
}

export default Input;
