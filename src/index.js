import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

let 수량초기값 = '';

function reducer3(state = 수량초기값, 액션){
  if(액션.type === '수량변경') {
    state = 액션.수량;
    console.log(state);
    return state;
  } else {
    return state;
  }
}

let alert초기값 = true;

function reducer2(state = alert초기값, 액션){
  if (액션.type === 'alert닫기') {
    state = false;
    return state;
  } else {
    return state;
  }
}

let 초기값 = [
  { id : 0, name : '멋진신발0', quan : 2 },
  { id : 1, name : '멋진신발1', quan : 5 },
  { id : 2, name : '멋진신발2', quan : 18 }
]

function reducer(state =초기값, 액션){

  if (액션.type === '항목추가') {
    // let res = copy.filter(x => x.id == 액션.payload.id);
    // if(Array.isArray(res) && res.length === 0) {
    //   console.log('비었음');
    //   copy.push(액션.payload);
    // } else {
    //   console.log('안 비었음');
    //   res[0].quan++;
    // }
    let copy = [...state];
    let res = state.findIndex(x => x.id === 액션.payload.id);
    if(res >= 0) {
      console.log('있다');
      console.log(copy[res].quan, 액션.payload.quan);
      let res2 = copy[res].quan + Number(액션.payload.quan);
      copy[res].quan = res2;
    } else {
      console.log('없다');
      copy.push(액션.payload);
    }
    return copy;
  } else if (액션.type === '수량증가') {
    let copy = [...state];
    copy[액션.데이터].quan++;
    return copy;
  } else if (액션.type === '수량감소'){
    let copy = [...state];
    copy[액션.데이터].quan--;
    return copy;
  } else {
    return state;
  }
  
  
}

let store = createStore(combineReducers({reducer,reducer2,reducer3}));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();