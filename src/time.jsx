import React, { useState } from 'react';

function Time() {
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

export default Time;
