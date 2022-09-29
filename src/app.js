import React from 'react';

import './assets/scss/common.scss';
// 异步引入黑夜主题样式
import('./assets/scss/darkTheme.scss');

import HomePage from './views/HomePage';

function App(){
  return <HomePage></HomePage>;
}

export default App;