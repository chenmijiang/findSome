import React from 'react';

import './assets/scss/common.scss';
// 异步引入黑夜主题样式
import('./assets/scss/darkTheme.scss');

import Home from './views/Home';

function App(){
  return <Home></Home>;
}

export default App;