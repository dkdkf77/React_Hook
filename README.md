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
- setState를 불러올때 새로 변경될 state값이 이전 state값과 연관이 되어 있다면 setState의 인자로 콜백 함수를 넣어주는게 좋다
- useState를 사용해서 초기값을 받아올때 어떤 무거운 일을 해야 한다면 useState의 인자로 콜백 함수를 넣어주면 효율적으로 작업 가능

# useEffect는 ?

- 어떠한 컴포넌트가 Mount = 화면에 첫 렌더링 , Update = 다시 렌더링, Unmount = 화면에서 사라질때
- 특정 작업을 처리할 코드를 실행하고자 할 때 사용
- useEffect(()⇒{//작업}) useEffect 훅의 인자로는 기본적으로 콜백 함수는 받는다

### 궁금했던 콜백 함수!! 콜백이란?!

다른 함수의 인자로 전달된 함수를 의미한다?!

콜백 함수 안에 원하는 처리해야할 작업을 적어주면 된다고 한다

# useEffect의 2가지 형태

```jsx
useEffect(() => {
  //작업
});
//인자로 하나의 콜백 함수만 받는 형태
// 렌더링 될때 마다 실행
// 즉, mount , update, unmount 렌더링 될때 마다 콜백함수 실행
```

```jsx
useEffect(() => {
  //작업
}, [value]);

//인자로 두개의 콜백 함수 받는 형태
// [value] = Dependency array
// 화면에 첫 렌더링 될때 실행 , value 값이 바뀔때 실행

useEffect(() => {
  //작업
}, []);

// 만약 빈배열을 전달해주면
// 화면에 첫 렌더링 될때만 실행
```

### useEffect의 사용처

ex ) 타이머를 실행했을때 타이머를 멈추는 정리 작업,

```jsx
useEffect(() => {
  //구독

  return () => {
    //구독해지 ...
  };
}, []);
```

## Timer.js 파일

```jsx
import React, { useEffect } from 'react';

const Timer = (props) => {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('타이머 돌아가는중 ...');
    }, 1000);

    return () => {
      //clean up
      clearInterval(timer);
      console.log('타이머가 종료 되었습니다');
    };

    // 즉 Timer는 마운트 될때 시작 되고 return 값은 unmount 될때 clear 시켜줄수 있다
  }, []);
  return (
    <div>
      <span>타이머를 시작합니다. 콘솔을 보세요!</span>
    </div>
  );
};

export default Timer;
```

## UseEffectCleanUp.jsx 파일 import Timer.js

```jsx
import React, { useEffect } from 'react';

const Timer = (props) => {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('타이머 돌아가는중 ...');
    }, 1000);

    return () => {
      //clean up
      clearInterval(timer);
      console.log('타이머가 종료 되었습니다');
    };

    // 즉 Timer는 마운트 될때 시작 되고 return 값은 unmount 될때 clear 시켜줄수 있다
  }, []);
  return (
    <div>
      <span>타이머를 시작합니다. 콘솔을 보세요!</span>
    </div>
  );
};

export default Timer;
```

```jsx
// useRef를 부르면 ref 변수를 반환 해준다
// ref => {current:value};
// ref object는 수정이 가능해서 언제든 수정을 하면 된다

// ex const =ref = useRef('hi') => {current : 'hi'}
// ref.current = 'hello' => {current : 'hello'}
// ref.current = 'nice' => {current : 'nice'}
// 반환된 ref는 컴포넌트가 계속해서 렌더링 되도 값을 유지 할 수 있는 장점이 있다

const ref = useRef(value);

console.log(ref.current);
```

## useRef를 이용되는 2가지

- state와 비슷하게 어떠한 값을 저장해두는 용도
  - state를 변경하면 → 렌더링 → 컴포넌트 내부 변수들 초기화
  - 원하지 않는 렌더링 때문에 초기화 되는 것을 막을 수 있음
- Dom 요소에 접근
  - Ref를 통해 Dom 요소에 접근할 수 있다
  - 예를 들어 id를 넣는 input 을 클릭하지 않아도 자동적으로 focus 하게 할 수 있다

```jsx
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
// ref는 화면에 표시는 되지 않지만 카운터는 계속적으로 올라가는 상태
// state를 올린다고 버튼을 누르면 렌더링 되어 ref의 값이 한번에 올라감

export default UseRef;
```

---

## 변수와 useRef의 차이점

❗️ref, 변수 둘다 변화에 렌더링이 일어나지 않음, 즉, 화면이 업데이트가 되지 않음

하지만 렌더링을 시켜주는 useState를 만들어서 렌더링을 해주면 Ref 값만 변경되는 것을 확인 할 수 있다

- 이유 : 컴포넌트를 재 렌더링 하면 함수가 불려지는데 함수가 불려질때마다 변수는 초기화가 된다
- 밑에 보다 시키 UseRefDiff를 재 랜더링 하면 let countVar=0;에 의해 초기화

```jsx
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

  return (
    <div>
      <p>Ref: {countRef.current}</p>
      <p>Var: {countVar}</p>
      <button onClick={doRendering}>렌더링</button>
      <button onClick={increaseRef}>Ref 올려</button>
      <button onClick={increaseVar}>변수 올려</button>
    </div>
  );
}

export default UseRefDiff;
```

![스크린샷 2022-11-29 오후 8.41.21.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5768cc0b-8349-46d7-b019-a2a0fcd104b4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-11-29_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.41.21.png)

```jsx
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
```

## useState를 사용해서 useEffect를 사용해 console.log(렌더링 횟수)

<aside>
💡 무한루프

무한 루프에 빠지게 된다 ⇒ 그 이유는 useState의 setState가 렌더링 될때 불려와지는데 useEffect 안에서도 setState값을 +1을 하게 되니 이것도 렌더링을하게 되고 결국에는 계속 불러오게 되어 무한 루프에 빠지는데 이것을 해결할 수 있는 방법은 ref를 사용하는 것

ref를 사용하면 재 렌더링이 되지 않으니 +1이 되어도 무한루프에 빠지지 않는다

결과 적으로는 useRef는 변화는 되야 하지만 이것이 렌더링 되면 안되는 곳에 사용되면 좋다

</aside>
