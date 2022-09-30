import { configureStore } from '@reduxjs/toolkit';
// import { persistStore } from 'redux-persist';
// defaults to localStorage for web
// import storage from 'redux-persist/lib/storage'; 

// const reducer = combineReducers({});

// let store = configureStore(
//   {},{}
//   // redux 插件：https://github.com/zalmoxisus/redux-devtools-extension#usage
//   // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
// let persistor = persistStore(store);

// export { store, persistor };

let store = configureStore({
  reducer:{}
})

export { store };