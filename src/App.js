import React, { useState } from 'react';
import Time from './time';
import Input from './input';
import Count from './UseEffect1';

import UseRef from './useRef';
import UseRefDiff from './useRef_diff';
import EffectRef from './effectRef';

function App() {
  return (
    <div>
      <Time />
      <hr />
      <Input />
      <hr />
      <Count />
      <hr />
      <hr />
      <UseRef />
      <hr />
      <UseRefDiff />
      <hr />
      <EffectRef />
    </div>
  );
}

export default App;
