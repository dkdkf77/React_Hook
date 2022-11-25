### useState로 시계 만들어 보기 !

```jsx
import React, { useState } from 'react';

function App() {
  const [time, setTime] = useState(1);
  // 초기값으로 1을 담(을 time이라는 변수와 time을 업데이트 하기 위한 setTime을 배열 형식으로 반환
  const handleClick = () => {
    // setTime(time + 1);
    // button을 onClick 할때 마다 handleClick 함수를 불러와서 setTime(time + 1)을 시켜준다 -> 무한으로 올라간다

    // 시계처럼 만들기
    let newTime;
    if (time >= 12) {
      newTime = 1;
    } else {
      newTime = time + 1;
    }
    // time 이 12시 보다 커진 경우 newTime을 1로 설정 하고 그렇지 않으면 계속 올라감
    setTime(newTime);
  };

  console.log('업데이트'); // 렌더링 될때마다 업데이트 되는지 확인
  return (
    <div>
      <span>현재시각 : {time}시</span>
      <br />
      <button onClick={handleClick}>Update</button>
    </div>
  );
}

export default App;
```

## useState로 input 이름 등록 하기

```jsx
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
```

## 간단 요약

- useState는 state,와 setState를 배열 형태로 반환 해준다
- setState를 불러올때 새로 변경될  state값이 이전 state값과 연관이 되어 있다면 setState의 인자로 콜백 함수를 넣어주는게 좋다
- useState를 사용해서 초기값을 받아올때 어떤 무거운 일을 해야 한다면 useState의 인자로 콜백 함수를 넣어주면 효율적으로 작업 가능
