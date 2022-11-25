import React, { useState } from 'react';
import Time from './time';
import Input from './input';
import Count from './UseEffect1';
import UseEffectCleanUp from './UseEffectCleanUp';

function App() {
  return (
    <div>
      <Time />
      <hr />
      <Input />
      <hr />
      <Count />
      <hr />
      <UseEffectCleanUp />
    </div>
  );
}

export default App;
