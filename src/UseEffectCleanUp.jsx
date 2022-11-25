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
