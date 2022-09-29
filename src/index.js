import React from "react";
import ReactDOM from "react-dom/client";

// 引入 状态管理
import { Provider } from 'react-redux';
import { store } from './store';
// 持久化存储
// import { PersistGate } from 'redux-persist/integration/react';

import App from './app';

// 创建 虚拟DOM 根结点 
const root = ReactDOM.createRoot(document.getElementById('app'));

// 渲染虚拟DOM
root.render(
  <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <App />
      {/* </PersistGate> */}
  </Provider>
);